import {IoIosArrowDown, IoMdOptions} from "react-icons/io";
import React, {memo, useRef} from "react";
import "./FirstSection.css"
export const FirstSection=memo(({GroupingOption,setGrouping,OrderingOption,setOrdering}:{GroupingOption:string,OrderingOption:string,setGrouping:React.Dispatch<React.SetStateAction<string>>,setOrdering:React.Dispatch<React.SetStateAction<string>>})=>{
	const Displaybtn=useRef<HTMLDivElement>(null);
	const DisplayPopUpdiv=useRef<HTMLDivElement>(null);
	return <div id={"first-section"}>
		<div className={"borderColor btn"} id={"displaybtn"} ref={Displaybtn} onClick={()=>{
			DisplayPopUpdiv.current!.classList.toggle("hidden");
		}}>
			<IoMdOptions/>
			<p>Display</p>
			<IoIosArrowDown/>
		</div>
		<div ref={DisplayPopUpdiv} id={"displayPopUp"}  className={"borderColor hidden"} onMouseLeave={(e)=>{
			e.currentTarget.classList.toggle("hidden");
		}}>

			<div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
				<p style={{color:"#a4a5a6"}}>Grouping</p>
				<select className={"borderColor"} value={GroupingOption} onChange={(e)=>setGrouping(e.currentTarget.value)} style={{width:"90px",outline:"none",border:"none"}}>
					<option value={"Status"}>Status</option>
					<option value={"User"}>User</option>
					<option value={"Priority"}>Priority</option>
				</select>
			</div>

			<div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
				<p style={{color:"#a4a5a6"}}>Ordering</p>
				<select className={"borderColor"} value={OrderingOption} onChange={(e)=>setOrdering(e.currentTarget.value)} style={{width:"90px",outline:"none",border:"none"}}>
					<option value={"Priority"}>Priority</option>
					<option value={"Title"}>Title</option>
				</select>
			</div>

		</div>
	</div>
})
