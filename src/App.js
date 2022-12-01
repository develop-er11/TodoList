import React,{useState} from "react";
import "antd/dist/antd.min.css";
import './App.css';
import { Table, Button,Tag ,Input, Modal} from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const App = ()=>{
  
  let data = [
    {
      id:1,
      title: "Task1",
      timestamp: "Thu Jul 07 2022 14:48:41 GMT+0530 (India Standard Time)",
      description: "Submitting File",
      duedate: "2022-07-11",
      status: "Working",
      tags: ["progress","Improvement"],
      key:"1"
    },
    {
      id:2,
      title: "Task2",
      timestamp: "Thu Jul 07 2022 14:49:03 GMT+0530 (India Standard Time)",
      description: "Submitting Assignment",
      duedate: "2022-07-10",
      status: "Working",
      tags: ["progress","nice"],
      key:"2"
    },
    {
      id:3,
      title: "Task3",
      timestamp: "Thu Jul 07 2022 14:49:30 GMT+0530 (India Standard Time)",
      description: "Submitting Assignment",
      duedate: "2022-07-13",
      status: "Overdue",
      tags: ["progress","nice"],
      key:"3"
    },
    {
      id:4,
      title: "Task4",
      timestamp: "Thu Jul 07 2022 14:50:01 GMT+0530 (India Standard Time)",
      description: "Submitting Assignment",
      duedate: "2022-07-13",
      status: "Open",
      tags: ["progress","nice"],
      key:"4"
    },
    {
      id:5,
      title: "Task5",
      timestamp: "Thu Jul 07 2022 14:50:31 GMT+0530 (India Standard Time)",
      description: "Submitting Assignment",
      duedate: "2022-07-14",
      status: "Done",
      tags: ["progress","nice"],
      key:"5"
    },
    
    
  ]
  const [dataSource,setDataSource]=useState(data);
  const [isEditing,setIsEditing]=useState(false);
  const [EditingTask,setEditingTask]=useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key:"key",
      sorter:(a,b)=>{
        return a.id>b.id
      }      
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "key",
      sorter:(a,b)=>{
        return a.title>b.title
      },
      required:true
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "key",
      required:true,
      sorter:(a,b)=>{
        return a.title>b.title
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "key",
      required:true
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "key",
      sorter:(record1,record2)=>{
        return record1.duedate>record2.duedate
      },
      required:true,
    },
    {
      title: "Add Tags",
      dataIndex: "tags",
      key: "key",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        {
          text: <span>Nice</span>,
          value: 'nice',
        },
        {
          text: <span>Progress</span>,
          value: 'progress',
        },
        {
          text: <span>Loser</span>,
          value: 'loser',
        },
        {
          text: <span>Improvement</span>,
          value: 'Improvement',
        },
        
      ],
      onFilter: (value, record) => {return (record.tags.includes(value))},
      filterSearch: true,
      width: '20%',
      
      
    },
    {
      title: "Set Status",
      dataIndex: "status",
      key: "key",
      filters: [
        {
          text: <span>Done</span>,
          value: 'Done',
        },
        {
          text: <span>Working</span>,
          value: 'Working',
        },
        {
          text: <span>Open</span>,
          value: 'Open',
        },
        {
          text: <span>Overdue</span>,
          value: 'Overdue',
        },
        
      ],
      onFilter: (value, record) => {return (record.status===(value))},
      filterSearch: true,
      width: '20%',
      required:true
    },
    {
      key:"key",
      title:"Operations",
      render:(record)=>{
        return(
          <>
            <EditOutlined onClick={()=>{
              handleEdit(record)
            }}/>
            <DeleteOutlined onClick={()=>{
              handleDelete(record)
            }} style={{color:"red", marginLeft:"20px"}}/>
          </>
        )
      }
    }
  
  ];
  const { Search } = Input;
  const handleDelete=(record)=>{
    Modal.confirm({
      title:"Are you sure you want to delete this task",
      okText:"Yes",
      okType:"danger",
      onOk:()=>{

        setDataSource(pre=>{
          return (pre.filter(task=> task.title!==record.title))
        })
      }
    })
    alert("Deleted Successfully");
  }

  const handleEdit=(record)=>{
    setIsEditing(true);
    setEditingTask({...record});

  }
  
  const resetEditing=()=>{
    setIsEditing(false);
    setEditingTask(null);
  }
  const datalen=dataSource.length;

  const AddTask = () => {
    let title=document.getElementById('title');
    let duedate=document.getElementById('duedate');
    let description=document.getElementById('description');
    let tag=document.getElementById('tags');
    let tags=tag.value.split(' ');
    let status="Open";
    let id=Number(datalen)+1;
    let timestamp=new Date();
    let task={
      id:id,
      title:title.value,
      duedate:duedate.value,
      description:description.value,
      tags:tags,
      status:status,
      timestamp:timestamp.toString()
      
    }
    let d=timestamp.getDate().toString().padStart(2,"0");
    let m=(timestamp.getMonth()+1).toString().padStart(2,"0");
    let y=timestamp.getFullYear();
    
    let date=`${y}-${m}-${d}`;
    console.log(date);
    if(title.value===""){
      alert("Title field is mandatory");
      return;
    }
    if(description.value===""){
      alert("Description field is mandatory");
      return;
    }
    if(duedate.value<date){
      alert(`Due date must be more than ${date}`);
      return;
    }
    
    setDataSource(pre=>{
      return [...pre,task]
    }); 
    alert("Added Successfully");
  }

  const onSearch=(val)=>{
    let value=val.toUpperCase();
    setDataSource(pre=>{
      return (pre.filter(task=> 
        task.title.toUpperCase()===value
      ))
    })

  }
  
  const { TextArea } = Input;
    return (
      <div>
        <div className="top">
         
          <div className="search">
        <Search placeholder="Search Title" id="searchBar" onSearch={onSearch} enterButton />

        </div>
        </div>
        
        <form>
        <div className='add'>
          <div className='title'>
          <label htmlFor="title" className="value">Title</label>
          <div className='input'>
            <Input type="text" id="title" maxLength={100} placeholder='Enter the title of the task'></Input>
          </div>
          </div>
          <div className='due'>
            <label htmlFor="duedate" className="value"> DueDate </label>
            <div className='duedate'>
              <Input type="date" id="duedate" placeholder='Set Due Date'></Input>
            </div>
          </div>
          <div className='due'>
            <label htmlFor="tags" className="value"> Tags </label>
            <div className='duedate'>
              <Input type="text" id="tags" placeholder='Enter Tag Names'></Input>
            </div>
          </div>
          <div className='container'>
           <label htmlFor="description" className="value">Description</label>
           <div className="desc" >
            <Input type="text" id="description" rows={5} maxLength={1000} placeholder="Description"/></Input>
          </div>
        </div>
        </div>
        
        
        <div className='button'>
        <Button type='primary'  onClick={AddTask} style={{margin:"10px"}}>Add Task</Button>
        </div>
        </form>
        <Table className="table" dataSource={dataSource} columns={columns} pagination={{pageSize:10}} style={{margin:"20px"}}></Table>
        <Modal title="Edit Task" visible={isEditing} okText="Save" onCancel={()=>{
          resetEditing()
        }} onOk={()=>{
          setDataSource(pre=>{
            return pre.map(task=>{
              if(task.id===EditingTask.id){
                return EditingTask;
              }
              else{
                return task;
              }
            })
          })
          resetEditing();
          alert("Edited Successfully");
        }}>
          <label>Title</label>
          <Input name="title" value={EditingTask?.title} onChange={(e)=>{
            setEditingTask((pre)=>{
              return {...pre,title:e.target.value};
            });
          }}/>
          <label>Description</label>
          <TextArea name="description" rows={5} maxLength={1000} value={EditingTask?.description} onChange={(e)=>{
            setEditingTask((pre)=>{
              return {...pre,description:e.target.value};
            });
          }}/>
          <label>DueDate</label>
          <Input name="duedate" type="date" value={EditingTask?.duedate} onChange={(e)=>{
            setEditingTask((pre)=>{
              return {...pre,duedate:e.target.value};
            });
          }}/>
          <label>Tags</label>
          <Input name="tag" value={EditingTask?.tag} onChange={(e)=>{
            setEditingTask((pre)=>{
              return {...pre,tag:e.target.value};
            });
          }}/>
          <label>Status</label>
          <div>
        <select name="status" id="status" onClick={()=>{
          let value=document.getElementById('status').value
          setEditingTask((pre)=>{
            return {...pre,status:value};
          });
        }}>
            <option value="Done">Done</option>
            <option value="Working">Working</option>
            <option value="Open">Open</option>
            <option value="Overdue">Overdue</option>
        </select>
        </div>

        </Modal>
      </div>
    );  
}

export default App;
