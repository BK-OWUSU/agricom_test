import { useEffect, useRef, useState, useContext } from 'react';
import { Button, Card, Textarea, Dropdown, DropdownItem, Tooltip } from 'flowbite-react';
import { IoIosMailOpen , IoMdMailUnread  } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { TbTagStarred } from "react-icons/tb";
import { FaReply, FaStar  } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { GrDocument } from "react-icons/gr";
import { RiReplyFill, RiReplyAllFill ,RiShareForwardFill  } from "react-icons/ri";
import { IoArchiveOutline, IoTrashBinOutline, IoTrashOutline  } from "react-icons/io5";
import SearchBar from "@/components/ui/SearchBar";
import { emailData } from '@/utils/testData';
import { PrimaryButtonsMd } from "@/components/ui/Buttons";
import { AuthUserContext } from "@/contextManager/context/AppContext";
const LOCAL_STORAGE_KEY = 'gridColumnWidths';

export function  Email() {
  const {user} = useContext(AuthUserContext)
  const containerRef = useRef(null);
  const [allMailTab, setAllMailTab] = useState(true)
  const [emails, setEmails] = useState(emailData);
  const [filteredEmails, setFilteredEmails] = useState(emails)
  const [selectedMail, setSelectedMail] = useState({})
  const [activeIndex, setActiveIndex] = useState(0); 
  const getInitialWidths = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [18.3, 33.3, 48.4];
  };
  const [columnWidths, setColumnWidths] = useState(getInitialWidths);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columnWidths));
  }, [columnWidths]);

  const startDragging = (index, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const containerWidth = containerRef.current.offsetWidth;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;

      const newWidths = [...columnWidths];
      newWidths[index] += deltaPercent;
      newWidths[index + 1] -= deltaPercent;

      if (newWidths[index] < 10 || newWidths[index + 1] < 10) return;

      setColumnWidths(newWidths);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const gridTemplate = `${columnWidths[0]}% 5px ${columnWidths[1]}% 5px ${columnWidths[2]}%`;

  const handleSearch = (query) => {
    if (!query) {
       setEmails(emailData);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const searchedEmails = emails.filter((mail)=>{
        // Show all mails that match the query in sender (regardless of unread or not)
    if (allMailTab) {
        return mail.sender.toLowerCase().includes(lowerQuery);
      } else {
        // If not allMailTab, maybe you only want unread mails to be searchable
        return !mail.read && mail.sender.toLowerCase().includes(lowerQuery);
      }
  })
    setEmails(searchedEmails)
}

useEffect(()=>{
    let email =  emails[0];
    const username = email.sender
    const initial = username.split(" ")[0].charAt(0) + username.split(" ")[1].charAt(0)
     email = {
        ... email,
        initial: initial
    }
    setSelectedMail(email)
},[emails]);

const handleEmailClick = (email) => {
  const username = email.sender;
  const email_Id = email.id;
  const isAlreadyRead = email.read;
  // Compute initials (safe against single names)
  const nameParts = username.split(" ");
  const initial = nameParts.map(n => n.charAt(0)).join("").toUpperCase();

  const updatedEmail = {
    ...email,
    initial,
    read: true // Always mark as read in selectedMail
  };

  setSelectedMail(updatedEmail);
  // TODO: API call to mark as read in the backend
  // If not already read, update the emails state
  if (!isAlreadyRead) {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === email_Id ? { ...email, read: true } : email
      )
    );
  }
};

const leftPaneData = [
  { name: "Inbox", icon: IoIosMailOpen, count: emails.length, onclick:()=> handleInboxClick() },
  { name: "Sent", icon: FiSend, count: 0 , onclick:()=> handleSentClick(),},
  { name: "Draft", icon: GrDocument, count: 0, onclick:()=> handleDraftClick() },
  { name: "Starred", icon: FaStar , count: 0, onclick:()=> handleStarredClicked() },
  { name: "Archive", icon: IoArchiveOutline, count: 0 , onclick:()=> handleArchivedClick()},
  { name: "Junk", icon: IoTrashBinOutline, count: 0 , onclick:()=> handleJunkClick()},
  { name: "Trash", icon: IoTrashOutline, count: 0, onclick:()=> handleTrashClick()},
];

const handleInboxClick = () => {
  setFilteredEmails(emailData)
}
const handleSentClick = () => {
  // alert("Sent oo")
}

const handleDraftClick = () => {}

const handleStarredClicked = () => {
  const updatedEmails = emails.filter(email=> email.starred)
      setFilteredEmails(updatedEmails);
}

const handleArchivedClick = () => {}
const handleJunkClick = () => {}
const handleTrashClick = () => {}

const messageTriggerIcons = [
  {name: "Archive", icon:<IoArchiveOutline className="h-6 w-6 cursor-pointer"/>},
  {name: "Junk", icon:<IoTrashBinOutline className="h-6 w-6 cursor-pointer"/>},
  {name: "Delete", icon:<IoTrashOutline className="mr-2 h-6 w-6 cursor-pointer"/>},
  {name: "Reply", icon:<RiReplyFill className="h-6 w-6 cursor-pointer"/>},
  {name: "Reply all", icon:<RiReplyAllFill className="h-6 w-6 cursor-pointer"/>},
  {name: "Forward", icon:<RiShareForwardFill className="mr-2 h-6 w-6 cursor-pointer"/>}
]

const dropDownItems = [
  {name: "Mark as unread", onclick: ()=> markEmailAsUnRead()},
  {name: "Star thread", onclick: ()=> toggleEmailAsStarred()},
  // {name: "Add label"},
  // {name: "Mute thread"},
]

const markEmailAsUnRead = () => {
  const email_Id = selectedMail.id;
  //TODO api call to update email read status to false
  //Hard code to test
  setEmails(prevEmails =>
    prevEmails.map(email =>
      email.id === email_Id ? { ...email, read: false } : email
    )
  );
};

const toggleEmailAsStarred = () => {
  const email_Id = selectedMail.id;
  const starred = selectedMail.starred;

  // Toggle starred in the emails array
  setEmails(prevEmails =>
    prevEmails.map(email =>
      email.id === email_Id ? { ...email, starred: !starred } : email
    )
  );

  // Update selectedMail as well
  setSelectedMail(prev => ({
    ...prev,
    starred: !starred
  }));

  console.log("Updated Selected Mail:", {
    ...selectedMail,
    starred: !starred
  });
};





  return (
    <main ref={containerRef} className="h-fit grid border rounded-xl shadow-xl p-2" style={{ gridTemplateColumns: gridTemplate }}>
      {/*LEFT MAIL PANE  */}
      <section className="p-4">
      <header className="h-16 border-b p-2 bg-gray-200 rounded-lg">
        <Card theme={{root: {children: "h-fit w-[100%] p-3 overflow-x-auto"}}}>
         <p className=" overflow-x-auto">Email:  {user.email}</p>
        </Card>
      </header>
      <article className="p-2 mt-2">
      <Card theme={{ root: { children: "h-fit p-2 flex flex-col gap-2 overflow-x-auto " } }}>
        {leftPaneData.map((item, index) => {
          const isActive = activeIndex === index;
          const Icon = item.icon;
          return (
            <Tooltip key={item.name} content ={item.name} className="flex"
            theme={{target: "w-full"}}
            >
            <span
              key={item.name}
              onClick={() => {
                item.onclick();
                setActiveIndex(index);
              }}
              className={`group flex justify-between items-center cursor-pointer ${isActive ? 'bg-green-800 text-white' : 'bg-white text-gray-800'} 
                hover:bg-green-600 hover:text-white transition-colors duration-200 p-2 rounded-lg`}>
                  <p className="flex items-center gap-2">
                    <Icon className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}/>
                    {item.name}
                  </p>
                  <p className="w-7 h-5 text-sm text-center rounded">{item.count > 99 ? '99+' : item.count}</p>
            </span>
            </Tooltip>
            );
        })}
      </Card>

      </article>
      </section>
      {/* Resizer 1 */}
      <div onMouseDown={(e) => startDragging(0, e)}className="cursor-col-resize bg-gray-100"></div>

      {/*MIDDLE MAIL PANE  */}
      <section className="p-4 relative">
        <header className='h-16 border-b flex justify-between items-center pb-4'>
            <div className="text-2xl font-bold">Inbox</div>
            <div className='flex gap-3 bg-gray-200 rounded-xl p-2'>
                <Tooltip content="Show all messages"><Button onClick={()=> setAllMailTab(true)} className='p-0' color={allMailTab ? "success" : "light"}>All Mail</Button></Tooltip> 
                <Tooltip content="Unread"><Button onClick={()=> setAllMailTab(false)} className='p-0' color={allMailTab ? "light" : "success"}>Unread</Button></Tooltip>
            </div>
        </header>
        <div className="mt-4 max-h-[90vh] overflow-x-auto ">
        <header className="flex mb-4 sticky bg-white top-0 shadow-md z-50">
            <SearchBar  
              placeholder="Search mail"
              onSearch={handleSearch} 
            />
        </header>
        {allMailTab ?
        (<article className='h-[80vh] flex flex-col gap-4 p-2'>
         {filteredEmails.map((email, index)=> (
            <Card key={index}
                onClick={()=> handleEmailClick(email)}
                className=" cursor-pointer"
            >
             <header className="flex justify-between">
                <span className="flex gap-2 items-center">
                    <h5 className={`text-xl ${!email.read ?  "font-bold": ""}`}>{email.sender}</h5>
                    {!email.read && <div className="bg-green-500 animate-pulse h-4 w-4 rounded-full" />}
                </span>
                <p className="text-gray-500">{email.time}</p>
             </header>
             <span className="font-semibold">{email.subject}</span>
             <article className="line-clamp-1">{email.body}</article>
             <div className="flex gap-3">
                {email.tags.map((tag, idx) => (
                    <Button key={idx} color="light">{tag}</Button>
                ))}
             </div>
            </Card>
         ))}
        </article>)
        :
        // FOR UNREAD EMAILS 
        (<article className='h-[100vh] flex flex-col gap-4 p-2'>
            {filteredEmails.map((email, index)=> (
            !email.read &&
            <Card key={index}
                onClick={()=> handleEmailClick(email)}
                className=" cursor-pointer"
            >
             <header className="flex justify-between">
                <span className="flex gap-2 items-center">
                    <h5 className={`text-xl ${!email.read ?  "font-bold": ""}`}>{email.sender}</h5>
                    {!email.read && <div className="bg-green-500 h-4 w-4 rounded-full" />}
                </span>
                <p className="text-gray-500">{email.time}</p>
             </header>
             <span className="font-semibold">{email.subject}</span>
             <article className="line-clamp-1">{email.body}</article>
             <div className="flex gap-3">
                {email.tags.map((tag, idx) => (
                    <Button key={idx} color="light">{tag}</Button>
                ))}
             </div>
            </Card>
         ))}
        </article>)       
        }
        </div>
      </section>

      {/* Resizer 2 */}
      <div onMouseDown={(e) => startDragging(1, e)} className="cursor-col-resize bg-gray-100"></div>
      
      {/*MAIL CONTENT AREA  */}
      <section className="p-4">
        <header className="h-16 pb-4 border-b p-2 flex justify-between">
          <div className="flex gap-4 items-center justify-center">
              {messageTriggerIcons.slice(0, 3).map((item, index)=>(
                <Tooltip content ={item.name} key={index}><span>{item.icon}</span></Tooltip>
              ))}
            <div className="bg-gray-200 border-r-2 h-8"></div>
         </div>
         <div className="flex gap-4 items-center justify-center">
              {messageTriggerIcons.slice(3).map((item, index)=>(
                <Tooltip content ={item.name} key={index}><span>{item.icon}</span></Tooltip>
                ))}
            <div className="bg-gray-200 border-r-2 h-8"></div>
            <Tooltip content="Actions">
                <Dropdown color='success' label={<CiMenuKebab className="mr-2 h-6 w-6 cursor-pointer"/>}>
                 {dropDownItems.map((item, index)=>(
                  <Tooltip content = {item.name} key={index}>
                    <DropdownItem onClick={item.onclick}>{item.name}</DropdownItem>
                  </Tooltip>
                 ))}
              </Dropdown>
            </Tooltip> 
         </div>
        </header>
        <header className="grid grid-cols-[10%_88%] gap-[2%] h-36 p-2 border-b">
         <div className="bg-gray-300 text-xl w-20 h-20 rounded-full mt-3 flex items-center justify-center">
            {selectedMail.initial}
         </div>
         <div className="h-full w-full flex flex-col">
            <div className="flex justify-between items-center p-4">
               <h5 className="font-bold text-lg">{selectedMail.sender}</h5>
               <p>{selectedMail.date}</p> 
            </div >
            <span className="pl-4 mb-1">{selectedMail.subject}</span>
            <span className="pl-4">Reply To: {selectedMail.email}</span>
         </div>
        </header>
         <article className="text-xl m-4 h-[42vh]">
            {selectedMail.body}
         </article>
         <div>
         <Textarea 
              color= "success" 
              name="reply_mail" 
              placeholder="Type message here..." rows={8}
            //   value={formData.description}
            //   onChange={handleTextChange}
             />
         </div>
         <div className="flex items-end justify-end mt-4">
         <PrimaryButtonsMd 
            className = "p-1"
            btnIcon ={<FaReply className="mr-2 h-5 w-5" />} 
            text = "Reply"
            type="submit"
            />
         </div>
     </section>
    </main>
  );
}
