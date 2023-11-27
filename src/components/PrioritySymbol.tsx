import {PiDotsThreeBold} from "react-icons/pi";
import { MdSignalCellular4Bar } from "react-icons/md";
import { MdSignalCellular3Bar } from "react-icons/md";
import { MdSignalCellular1Bar } from "react-icons/md";
import { BsExclamationSquareFill } from "react-icons/bs";

import {memo} from "react";

export const PrioritySymbol=memo(({priority}:{priority:string})=>{
	return <>
		{priority==="0"?<PiDotsThreeBold/>:priority==="1"?<MdSignalCellular1Bar/>:priority==="2"?<MdSignalCellular3Bar/>:priority==="3"?<MdSignalCellular4Bar/>:<BsExclamationSquareFill color={"#f86d14"}/>}
	</>
})