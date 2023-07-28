// Copyright 2020-2021 the Deno authors. All rights reserved. MIT license.

import { parse } from "https://deno.land/std@0.132.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.132.0/path/mod.ts";
import { relative } from "https://deno.land/std@0.132.0/path/mod.ts";
import { codegen } from "./codegen.ts";

const flags=parse(Deno.args, { "--": true });
const release=!!flags.release;


const metafile=join(
  Deno.env.get("OUT_DIR")||await findRelativeTarget(),
  "bindings.json",
);

function build() {
  const args=["build"];
  if(release) args.push("--release");
  args.push(...flags["--"]);

  const proc=new Deno.Command("cargo",{
    args,
    stdout: "piped"
  });

  return proc.spawn();
}

async function findRelativeTarget() {
  const p=new Deno.Command("cargo",{
    args: ["metadata","--format-version", "1"],
    stdout: "piped"
  });

  const output=await p.output();

  const metadata=JSON.parse(new TextDecoder().decode(output.stdout));

  return relative(Deno.cwd(), metadata.workspace_root);
}

let source=null;
async function generate() {
  let conf;
  try {
    conf=JSON.parse(await Deno.readTextFile(metafile));
  } catch (_) {
    // Nothing to update.
    return;
  }

  const cargoTarget=Deno.env.get("CARGO_TARGET_DIR")??"./target";

  const pkgName=conf.name;
  const fetchPrefix=typeof flags.release==="string"
   ?flags.release
   :await findRelativeTarget()+[cargoTarget,release?"release":"debug"]
      .join("/");

  source="// Auto-generated with deno_bindgen\n";
  source+=codegen(
    fetchPrefix,
    pkgName,
    conf.typeDefs,
    conf.tsTypes,
    conf.symbols,
    {
      le: conf.littleEndian,
      release,
      releaseURL: flags.release,
    },
  );

  await Deno.remove(metafile);
}

try {
  await Deno.remove(metafile);
} catch {
  // no op
}

const process=build();

console.log(process.stdout);


const status=await process.status;

if(status.success||typeof flags.release==="string") await generate();
source?await Deno.writeTextFile("bindings/bindings.ts",source):Deno.exit(status?.code||1);

Deno.exit(status.code);
