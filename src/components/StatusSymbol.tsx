import {memo} from "react";
import { LuCircleDashed } from "react-icons/lu";
import { LuCircle } from "react-icons/lu";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";


export const StatusSymbol=memo(({status}:{status:string})=>{
	return <>
		{status==="Backlog"?
			<LuCircleDashed color={"#c9cdd7"}/>
		:(status==="Todo"?
			<LuCircle color={"#c9cdd7"}/>
		:(status==="In progress"?
			<FaCircleHalfStroke color={"#facc26"} />
		:(status==="Done"?
			<IoMdCheckmarkCircle color={"#4f4fe7"} size={18} />
		: <GoXCircleFill color={"#a6a6af"} size={18} />
		)))}

	</>
})