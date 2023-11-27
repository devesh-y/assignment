import './App.css'
import {useCallback, useEffect, useState} from "react";
import {FirstSection} from "./FirstSection";
import {SecondSection} from "./SecondSection";
export type TicketType={
    id:string,
    title:string,
    tag:string[],
    name:string
}
export type UsersGroupType={
    status:string,
    priority:number;
}
export type StatusGroupType={
    userId:string;
    priority:number
}
export type PriorityGroupType ={
    status:string,
    userId:string
}
const Priority:Record<string, string>={
    "0":"No priority",
    "1":"Low",
    "2":"Medium",
    "3":"High",
    "4":"Urgent"
}
const StatusPriority:Record<string, number>= {
    'Backlog': -4,
    'Todo': -3,
    'In progress': -2,
    'Done': -1,
    'Canceled': 0
};
const App=()=>{

    const [ApiData,setApiData]=useState(null);
    const [GroupingOption,setGrouping]=useState("Status");
    const [OrderingOption,setOrdering]=useState("Priority");
    const [IdNameMapping,setNameMapping]=useState<Map<string,string>>(new Map());
    const [sectionData,setSectionData]=useState<[string, (TicketType & (UsersGroupType|StatusGroupType|PriorityGroupType))[]][]>([])
    const [GotCache,setGotCache]=useState(false);
    const [UsersGroup,setUsersGroup] =useState< [string, (TicketType & UsersGroupType)[]][]>([]);
    const [StatusGroup,setStatusGroup] =useState< [string, (TicketType & StatusGroupType)[]][]>([]);
    const [PriorityGroup,setPriorityGroup] =useState< [string, (TicketType & PriorityGroupType)[]][]>([]);


    useEffect(() => {
        const cache=localStorage.getItem("UserState");
        if(cache){
            const extract :{"PriorityGroup": [string, (TicketType & PriorityGroupType)[]][],"StatusGroup": [string, (TicketType & StatusGroupType)[]][],"UsersGroup":[string, (TicketType & UsersGroupType)[]][],"OrderingOption":string,"GroupingOption":string}=JSON.parse(cache);
            setPriorityGroup(extract.PriorityGroup);
            setUsersGroup(extract.UsersGroup);
            setStatusGroup(extract.StatusGroup);
            setOrdering(extract.OrderingOption);
            setGrouping(extract.GroupingOption);
        }
        setGotCache(true);
    }, []);

    useEffect(() => {
        if(GotCache){
            const arr1=GroupingOption==="User"?UsersGroup:GroupingOption==="Status"?StatusGroup:PriorityGroup;
            if(!(OrderingOption==="Priority" && GroupingOption==="Priority")){
                arr1.forEach(([_a,data])=>
                {
                    data.sort((a,b)=>{
                        if(OrderingOption==="Title"){
                            return (a.title).localeCompare(b.title);
                        }
                        else
                        {
                            return Number((b as(TicketType & UsersGroupType) ).priority-(a as(TicketType&UsersGroupType) ).priority);
                        }
                    })

                })
            }
            const str=JSON.stringify(arr1);
            const arr=JSON.parse(str);
            setSectionData(arr);

            localStorage.setItem("UserState",JSON.stringify({GroupingOption,OrderingOption,UsersGroup,StatusGroup,PriorityGroup}));

        }

    }, [GotCache, GroupingOption, OrderingOption, PriorityGroup, StatusGroup, UsersGroup]);

    const fetchData=useCallback(()=>{
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment ").then((response)=>{
            return response.json();
        }).then((data)=>{
            setApiData(data);
        })
    },[]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    useEffect(() => {
        if(ApiData){
            const tickets:(TicketType&UsersGroupType&StatusGroupType&PriorityGroupType)[]=ApiData["tickets"];
            const tempusersgroup:Record<string,(TicketType&UsersGroupType)[]>={};
            const tempstatusgroup:Record<string,(TicketType&StatusGroupType)[]>={"Backlog":[],"Todo":[],"Done":[],"In progress":[],"Canceled":[]};
            const tempprioritygroup:Record<string,(TicketType&PriorityGroupType)[]>={"0":[],"1":[],"2":[],"3":[],"4":[]};
            const user_data:{id:string,name:string,available:boolean}[]=ApiData["users"];
            const tempmapping:Map<string,string>=new Map();
            user_data.forEach(({id,name})=>{
                tempmapping.set(id,name);
            })
            setNameMapping(tempmapping);
            tickets.forEach((value)=>{
                const {id,title,tag,userId,status,priority}=value;
                const name:string=tempmapping.get(userId) as string;
                tempusersgroup[userId] = [...(tempusersgroup[userId] || []), { id, title, tag, status, priority,name}];
                tempstatusgroup[status] = [...(tempstatusgroup[status] || []), { id, title, tag, userId, priority,name }];
                tempprioritygroup[priority] = [...(tempprioritygroup[priority] || []), { id, title, tag, userId, status,name }];
            })

            setUsersGroup((Array.from(Object.entries(tempusersgroup))).sort((a,b)=> {
                return (tempmapping.get(a[0]) as string).localeCompare(tempmapping.get(b[0]) as string);
            }));
            setPriorityGroup((Array.from(Object.entries(tempprioritygroup))).sort((a,b)=>{
                return b[0].localeCompare(a[0]);
            }));
            setStatusGroup((Array.from(Object.entries(tempstatusgroup))).sort((a, b)=>{
                return StatusPriority[a[0]]-StatusPriority[b[0]];
            }));

        }
    }, [ApiData]);



    return <>
        <FirstSection GroupingOption={GroupingOption} setGrouping={setGrouping} OrderingOption={OrderingOption} setOrdering={setOrdering}/>
        <div id={"dataDiv"}>
            <SecondSection sectionData={sectionData} GroupingOption={GroupingOption} IdNameMapping={IdNameMapping} Priority={Priority}/>

        </div>

    </>
}

export default App;
