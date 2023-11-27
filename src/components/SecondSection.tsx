import {NameAvatar} from "./NameAvatar";
import {StatusSymbol} from "./StatusSymbol";
import {PrioritySymbol} from "./PrioritySymbol";
import {IoMdAdd} from "react-icons/io";
import {BsThreeDots} from "react-icons/bs";
import {Card} from "./Card";
import {memo} from "react";
import {PriorityGroupType, StatusGroupType, TicketType, UsersGroupType} from "./App";

export const SecondSection=memo(({sectionData,GroupingOption,IdNameMapping,Priority}:{sectionData:[string, (TicketType & (UsersGroupType|StatusGroupType|PriorityGroupType))[]][],GroupingOption:string,IdNameMapping:Map<string,string>,Priority:Record<string, string>})=>{
	return <div id={"second-section"}>

		{sectionData.map(([key,value],index)=>{
			return <div key={index} className={"section"}>
				<div  className={"section-title"}>
					<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
						{GroupingOption==="User"? <>
							<NameAvatar name={IdNameMapping.get(key) || ""}/>
							<div title={IdNameMapping.get(key) || ""} style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"150px"}}>{IdNameMapping.get(key) || ""}</div>
						</>:GroupingOption==="Status"?<>
							<div style={{position:"relative",top:"3px"}}><StatusSymbol status={key}/></div>
							<div>{key}</div>
						</>:<>
							<div style={{position:"relative",top:"3px"}}><PrioritySymbol priority={key}/></div>
							<div>{Priority[key]}</div>
						</>  }

						<div style={{color:"#a1a4a8"}}>{value.length}</div>
					</div>

					<div style={{display:"flex",alignItems:"center",gap:"10px",color:"#8f8f91"}}>
						<IoMdAdd/>
						<BsThreeDots/>
					</div>
				</div>
				<div className={"cards"}>
					{value.map((tempcard,index)=>{
						return <Card type={GroupingOption} card={tempcard}  key={index}/>
					})}

				</div>
			</div>
		})}

	</div>
})