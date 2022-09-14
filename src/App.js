import { Form } from 'antd';
import { Button, Modal } from 'antd';
import { Radio } from 'antd';
import './App.css';
import { ReactDOM } from 'react-dom';
import { Popover } from 'antd';
import React, { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useState } from "react";
import { Space, Table, Tag } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;

const App = () => {
  const [form] = Form.useForm();

  const [size, setSize] = useState("large");
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const columns = [

    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text) => <a>{text}</a>,
      width: 150,
    },

    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
            <span className="deleteIcon"
              onClick={() => {
                onEditStudent(record);
              }}>
              <i className="fas fa-pencil-alt" title="Edit" style={{ color: '#3D7ABE' }} />
            </span>

            <span className="deleteIcon"
              onClick={() => {
                deleteTable(contacts, record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            >
              <i className="fas fa-trash-alt" title="Delete" />
            </span>
          </>
        );
      },
    },
  ];

  const data = {
    name: '',
    email: '',
    subject: '',
    message: '',
    action: '',
  };


  const [contacts, setContacts] = useState([]);

  const [inputValues, setInputValue] = useState(data);
  const [validationN, setValidationN] = useState("");

  const [user, setUser] = useState(null);

  const [validationE, setValidationE] = useState("");
  const [validationS, setValidationS] = useState("");
  const [validationM, setValidationM] = useState("");
  const [userData, setUserData] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });

  }
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);


  const onReset = () => {
    form.resetFields();
  };


  useEffect(() => {

  }, contacts)


  // const onAddStudent = () => {
  //   const randomNumber = parseInt(Math.random() * 1000);
  //   const newStudent = {
  //     id: randomNumber,
  //     name: "Name " + randomNumber,
  //     email: randomNumber + "@gmail.com",
  //     subject: "Subject " + randomNumber,
  //     message: "Message " + randomNumber,

  //   };
  //   setInputValue((pre) => {
  //     return [...pre, newStudent];
  //   });
  // };


  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const deleteTable = (arr, item) => {

    if (window.confirm("Are you sure you want to delete this row  ?") === true) {

      const index = item.id - 1;


      if (index != -1) {

        arr.splice(index, 1);
        for (let i = 0; i < arr.length; i++) {
          arr[i].id = i + 1;
        }

        setContacts([...arr]);

      }
    }
  }

  const handleSubmit = (e) => {
    var flag = false;

    e.preventDefault();
    let b = inputValues.name.length;

    if (b < 10) {
      flag = false;
      // setValidationN('')
      // setValidationN((previousState) =>
      // ({
      //   ...previousState,

      //   ['name']: 'You must add the name'
      // })

      // )
      setValidationN({ ...validationN, ["name"]: 'You must add the name' })
    }
    else {

      flag = true;


    }

    let c = inputValues.subject.length;
    if (c < 10) {
      flag = false;
      setValidationS((previousState) =>
      ({
        ...previousState,
        ['subject']: 'You must add the text here dhjsk'
      })
      )
      setValidationS({ ...validationS, ["subject"]: 'You must add the text here' })

    } else {
      flag = true;

      // errorsS.subject;

    }


    let d = inputValues.message.length;
    let errorsM = validationM;
    if (d < 10) {
      flag = false;

      setValidationM((previousState) =>
      ({
        ...previousState,
        ["message"]: 'You must add the text here'
      })
      )
      setValidationM({ ...validationM, ["message"]: "You must write something" })
    } else {
      flag = true;

    }

    const emailCond = '^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$';



    if (!inputValues.email.trim()) {
      flag = false;

      setValidationE((previousState) =>
      ({
        ...previousState,
        ['email']: 'You must add the text here'
      })
      )

      setValidationE({ ...validationE, ['email']: 'Email is required' })
    } else if (!inputValues.email.match(emailCond)) {

    } else {
      flag = true;

    }


    if (flag == true && inputValues.name.length > 5 && inputValues.message.length > 5 && inputValues.subject.length > 5) {

      localStorage.setItem('inputValues', JSON.stringify(inputValues));
      setContacts(oldArray => { return [...oldArray, { 'id': contacts.length + 1, 'name': inputValues.name, 'email': inputValues.email, 'subject': inputValues.subject, 'message': inputValues.message, }] });
    }

  };
  return (
    <>

      {/* <LayoutComp > */}
      {/* <div className='about-main'>

        <h3 className='about-h3'>Welcome to Ezwage</h3>

        <br />
        <h1 className='about-h1'>We are a team of expert developer</h1>
        <h6 className='about-h6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
          Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum<br />
          laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium<br />
          optio, eaque rerum! Provident similique accusantium nemo autem. </h6>
        <br />
        <div className=" d-flex justify-content-center " >
          <div className="col-md-2 p-3">
            <img className='pic'
              src="https://picsum.photos/200/300"
            />
          </div>
          <div className="col-md-2 p-3">
            <img className='pic'
              src="https://picsum.photos/200/300"
            />
          </div>
          <div className="col-md-2 p-3">
            <img className='pic'
              src="https://picsum.photos/200/300"
            />
          </div>

        </div>
        <br />

        <h6 className='about-h6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
          Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum<br />
          laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium<br />
          optio, eaque rerum! Provident similique accusantium nemo autem. </h6>




      </div> */}

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="wrapper">
            <div className="row no-gutters">
              <div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">

                <div className="contact-wrap w-100 p-md-5 p-4">
                  <h3 className="mb-4">Get in touch</h3>
                  <div id="form-message-warning" className="mb-4"></div>
                  <div id="form-message-success" className="mb-4">Your message was sent, thank you! </div>
                  <form method="POST" id="contactForm" name="contactForm" className="contactForm" >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="label" for="name">Full Name</label>
                          <Input type="text" className="form-control" name="name" id="name" placeholder="Name" onChange={(e) => handleChange(e)} value={inputValues.name} />
                          <p className="text-danger">{validationN.name}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="label" for="email">Email Address</label>
                          <Input type="email" className="form-control" name="email" id="email" placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.email}></Input>
                          <p className="text-danger">{validationE.email}</p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="label" for="subject">Subject</label>
                          <Input type="text" className="form-control" name="subject" id="subject" placeholder="Subject"
                            onChange={(e) => handleChange(e)}
                            value={inputValues.subject} />
                          <p className="text-danger">{validationS.subject}</p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="label" for="message">Message</label>
                          <TextArea name="message"
                            value={inputValues.message}

                            showCount maxLength={15} style={{ height: 120, }}
                            onChange={(e) => handleChange(e)}
                          />
                          <p className="text-danger">{validationM.message}</p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">

                          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>

                            <Button type="primary" className="btn-sendmsg" onClick={handleSubmit} shape="round" size={size} >

                              Send Message
                            </Button>
                            <div class="space">  </div>

                            
                            <Button type="primary" className="btn-resetfield" onClick={onReset} shape="round" size={size}>
                                      Reset
                           </Button>

                          </Radio.Group>

                          <div className="submitting">

                            {contacts.length > 0 ? <Table columns={columns} dataSource={contacts} /> : ""}
                           
                            {contacts.map((cont) => {
                              return (   
                             <table className="tab">
                                 <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                 </tr>

                                 <tr>
                                 <td>{cont.name}</td>
                                 <td>{cont.email}</td>
                                 <td>{cont.subject}</td>
                                 <td>{cont.message}</td>

                                 </tr>

                                  </table>)
                                  
                              }
                             )}

                                



                            {/* <li key={cont.id}>
                            <h1> Name :  {cont.name} </h1> 
                              {cont.subject}
                              {cont.message}
                              
                            </li>)

                            })

                            } */}

                         </div>

                          <Modal
                            title="Edit Table"
                            visible={isEditing}
                            okText="Save"
                            onCancel={() => {
                              resetEditing();
                            }}
                            onOk={() => {
                              setContacts((arr1) => {
                                return arr1.map((student) => {
                                  // console.log("student.id is", student.id); // id no
                                  if (student.id === editingStudent.id) {
                                    // console.log("student.id is", student.id);
                                    return editingStudent;
                                  } else {
                                    return student;
                                  }
                                });
                              });
                              resetEditing();
                            }}
                          >
                            <Input
                              value={editingStudent?.name}
                              onChange={(e) => {
                                setEditingStudent((arr1) => {
                                  return { ...arr1, name: e.target.value };
                                });
                              }}
                            />
                            <Input
                              value={editingStudent?.email}
                              onChange={(e) => {
                                setEditingStudent((arr1) => {
                                  return { ...arr1, email: e.target.value };
                                });
                              }}
                            />
                            <Input
                              value={editingStudent?.subject}
                              onChange={(e) => {
                                setEditingStudent((arr1) => {
                                  return { ...arr1, subject: e.target.value };
                                });
                              }}
                            />
                            <Input
                              value={editingStudent?.message}
                              onChange={(e) => {
                                setEditingStudent((arr1) => {
                                  return { ...arr1, message: e.target.value };
                                });
                              }}
                            />
                          </Modal>

                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>


              <div className="col-lg-4 col-md-5 d-flex align-items-stretch">
                <div className="info-wrap bg-primary w-100 p-md-5 p-4">
                  <h3>Let's get in touch</h3>
                  <p className="mb-4">We're open for any suggestion or just to have a chat</p>
                  <div className="dbox w-100 d-flex align-items-start">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-map-marker"></span>
                    </div>
                    <div className="text pl-3">
                      <p><span>Address:</span> Sarfaraz Rafiqui Road,Near GPO Cantt Lahore</p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-phone"></span>
                    </div>
                    <div className="text pl-3">
                      <p><span>Phone:</span> <a href="tel://1234567920">+111-222-3333</a></p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-paper-plane"></span>
                    </div>
                    <div className="text pl-3">
                      <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@Ezwage.com</a></p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-globe"></span>
                    </div>
                    <div className="text pl-3">
                      <p><span>Website</span> <a href="#">www.Ezwage.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* </LayoutComp> */}




    </>
  );

}
export default App;