
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  FormGroup,
  Form,
  Input,
  Col

} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.headers.common['Authorization'] =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjEyNGNkZjkwMzRjNmUzZDlhODVhN2JmIiwiZW1haWwiOiJtLmt1c2h3YWgzM0BnbWFpbC5jb20iLCJvcmciOnsiX2lkIjoiNjExZTU2ZGZmMjQ1NDA4Y2VkMzJiNmEyIiwib3JnTmFtZSI6Ik11a2VzaCB0ZXN0Iiwib3JnU2l6ZSI6IjEtMTAiLCJvcmdDb3VudHJ5IjoiSW5kaWEiLCJvcmdBZGRyZXNzIjoidGVzciIsImNyZWF0b3JOYW1lIjoiTXVrZXNoIFNjaG9vbCIsImNyZWF0b3JJZCI6IjYxMjRjZGY5MDM0YzZlM2Q5YTg1YTdiZiIsIl9fdiI6MH19LCJpYXQiOjE2Mjk4NTk4OTIsImV4cCI6MTYyOTg2MTMzMn0.ImmDIt82HhWdDebWeCzuloDyMd7oC-kDe6HiDC0ecXA`;


const Tables = () => {

  const[teachers,setTeachers] = useState({})
  const[isLoading,setIsloading] = useState(true)

  const save = (event)=>{
    event.preventDefault()
    var data = {
        first_name:event.target.first_name.value,
        last_name:event.target.last_name.value,
        username:event.target.username.value,
        email:event.target.email.value,
        password:event.target.password.value,
        country:event.target.country.value,
        experience:event.target.experience.value,
    }

    axios.post('http://localhost:4000/api/teacher/create',data).then((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const getTeachers = async () =>{
    setIsloading(true)
     var org = await axios.get('http://localhost:4000/api/teacher/teachersList').then((result)=>{
        return result.data
      }).catch((error)=>{
        console.log(error)
      })

    setTeachers(org) 
    if(org.message !== 'Unauthrised...'){
      setIsloading(false)
    }

  }

  useEffect(()=>{
    getTeachers()
    console.log(teachers)
  },[])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Teacher's</h3>
              </CardHeader>
              <Form onSubmit={((event)=>save(event))} style={{paddingLeft:'10px',paddingRight:'10px'}}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Input
                        id="exampleFormControlInput1"
                        placeholder="First Name"
                        type="text"
                        name="first_name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Input placeholder="Last Name" name="last_name" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Input placeholder="Username" name="username" type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Input placeholder="Email" name="email" type="email" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Input placeholder="Password" name="password" type="password" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup >
                      <Input
                        placeholder="Experience"
                        type="number"
                        name="experience"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup >
                      <Input
                        placeholder="Country"
                        type="text"
                        name="country"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row >
                  <Col className="text-center" md='12'>
                    <button className="btn btn-primary mb-2">Save</button>
                  </Col>
                </Row>
              </Form>
              <CardFooter className="py-4">
                
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Teacher's tables</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Teacher Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Experience</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ? teachers.map((value,key)=>(
                    <tr>
                      <td>{++key}</td>
                      <td>{value.first_name} {value.last_name}</td>
                      <td>{value.email}</td>
                      <td>{value.experience}</td>
                    </tr>  
                  )):<span>Loading...</span>}  
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
