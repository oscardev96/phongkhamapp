import React, { useRef, useState, useEffect } from "react";
import { Table, Row, Col, Button , Layout,Pagination, notification } from "antd";
import {
  PlusCircleFilled,
  LeftCircleOutlined,
  RightCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import CreateAppointment from "./CreateAppointment";
import { common_post, formatCurrency } from "../../utils";
import { api } from "../../api";
import { urlApi } from "../../urlApis";
import moment  from "moment";
const { Header, Content, Footer, Sider } = Layout;

export default function Appointment() {
    const [listAppointment, setListAppointment] = useState([])
    const [loading, setLoading]= useState(false)
    const [totalAppoint, setTotalAppoint] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage]  = useState(0)
    const appointRef = useRef()

    useEffect(() => {
      getData()
    }, [])

    const getData =  async (page = 1) => {
      try {
        let res = await common_post(urlApi.GET_LIST_APPOINTMENT, {page : page} ,{})
        console.log("DATA APPOINTMENT", res)
        if (res.status === "OK") {
          setListAppointment(res.result)
          setTotalAppoint(res.total)
          setCountPage(res.countPage)
          setCurrentPage(res.currentPage)
        }
      } catch (error) {
        
      }
    }
    const getDetailAppoint = async (id) => {
      try {
        console.log(id)
        let response = await common_post(urlApi.GET_APPOINTMENT, {id: id}, {})
        if (response.status === "OK") {
          appointRef.current.openModal(response.result)
        }
      } catch (error) {
        
      }
    }

    const onCreate = async (values) => {
      try {
        let response = await common_post(urlApi.CREATE_APPOINTMENT, values, {})
        console.log("Them thanh cong", response)
        if (response.status === "OK") {
          notification.success({message :"Thêm mới thành công !"})
          appointRef.current.closeModal()
          getData()
        }
        
      } catch (error) {
        
      }
    }

  

    const columns = [
        {
            title: 'Ngày khám',
            dataIndex: 'date',
            key: 'date',
            render : (date) => <span>{ date ? moment(date).format("L") : "--"}</span>
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        },
        {
          title: 'Chẩn đoán',
          dataIndex: 'chan_doan',
          key: 'chan_doan',
      },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            render : (total_price) => <span>{formatCurrency(total_price , "đ", true)}</span>
        },
    ]


    const onChange = (values) => {
        console.log(values)
    }
  return (
    <div className="container" >
      <Row justify="space-between" align="middle">
        <Col>
          <span style={{fontSize :"20px", color:"black", fontWeight:"bold"}}>Danh sách cuộc khám ({totalAppoint})</span>
        </Col>
        <Col>
          <Button
            icon={<PlusCircleFilled  style={{color:"#fff"}}/>}
            onClick={() => appointRef.current.openModal()}
            style={{backgroundColor:"#2CB2A5", borderRadius:"10px", color:"#FFF"}}
          >
            Thêm cuộc khám mới
          </Button>
        </Col>
      </Row>
      <div className="wrap_table" style={{height :"80vh", overflow :"auto"}}>
        <Table columns={columns} dataSource={listAppointment} pagination = {false} 
         onRow={(record, rowIndex) => {
          return {
            onClick: event => {getDetailAppoint(record.id)}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        />
      </div>
     
      
        <div style={{
          position:"absolute",
          bottom: "30px" ,
          right: "50px", 
          backgroundColor:"#FFF"
        }}>
          <Row gutter={20} align="middle">

            <Col>
            <Button  onClick={()=> {
              if (currentPage < 2) {
                return
              }else{
                getData(currentPage - 1)
              }
            }}
              icon = {<LeftOutlined/>}
            >
             
            </Button>
            </Col>
            <Col>
              <span style={{fontWeight :"bold"}}>Trang {currentPage}/{countPage}</span>
            </Col>
            <Col>
            <Button onClick={()=> {
              if (currentPage == countPage) {
                return
              }else{
                getData(currentPage + 1)
              }
            }}
              icon={<RightOutlined />}
            >
             
            </Button>
            </Col>
          </Row>

        </div>
        <CreateAppointment ref={appointRef} onCreate ={onCreate}/>
    </div>
  );
}

