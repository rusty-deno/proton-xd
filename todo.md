# dialog { open,save }//message,error,
# // clipboard
# screen
# desktop capturer
# upcoming [window_icon,window_menu,document_title_changed_handler,custom_protocols,ipc_handler,file_drop_handler,navigation_handler,download_started_handler,download_completed_handler,new_window_req_handler]

import { Some,Option } from "./lib/mod.ts";
import { Node } from "./lib/rust/collections/btree/mod.ts";
import { BinaryTree } from "./lib/rust/collections/mod.ts";

const tree=new BinaryTree(new Node(69,{
  left: {
    data: 10,
    right: Some({
      data: 10,
      left: Option.None,
      right: Option.None
    }),
    left: Option.None
  },
}));

tree.forEach(data=> console.log(d));