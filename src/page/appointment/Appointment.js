import React, { useRef, useState } from "react";
import { Table, Row, Col, Button , Layout,Pagination } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import CreateAppointment from "./CreateAppointment";
const { Header, Content, Footer, Sider } = Layout;
export default function Appointment() {
    const [listAppointment, setListAppointment] = useState([])
    const [loading, setLoading]= useState(false)

    const appointRef = useRef()


    const columns = [
        {
            title: 'Ngày khám',
            dataIndex: 'ngay_kham',
            key: 'ten_thuoc',
        },
        {
            title: 'Tên',
            dataIndex: 'ngay_kham',
            key: 'ten_benh_nhan',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'so_dien_thoai',
            key: 'so_dien_thoai',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'dia_chi',
            key: 'dia_chi',
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'bac_si',
            key: 'bac_si',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'tong_tien',
            key: 'tong_tien',
        },
    ]


    const onChange = (values) => {
        console.log(values)
    }
  return (
    <div className="container">
      <Row justify="space-between" align="middle">
        <Col>
          <span style={{fontSize :"20px", color:"black", fontWeight:"bold"}}>Danh sách khám</span>
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
        <Table columns={columns} dataSource={DATAFAKE} pagination = {false}/>
        <CreateAppointment ref={appointRef}/>
       
    </div>
  );
}

const DATAFAKE = [
    {
        ngay_kham : "20.22/22",
        ten_benh_nhan :"Caans van dat",
        so_dien_thoai:"09999282828",
        dia_chi:"Thon Ai, phuong son, Luc Ngan",
        bac_si:"Can thi hang",
        tong_tien:"100000",

    },
    {
        ngay_kham : "20.22/22",
        ten_benh_nhan :"Caans van dat",
        so_dien_thoai:"09999282828",
        dia_chi:"Thon Ai, phuong son, Luc Ngan",
        bac_si:"Can thi hang",
        tong_tien:"100000",

    },
    {
        ngay_kham : "20.22/22",
        ten_benh_nhan :"Caans van dat",
        so_dien_thoai:"09999282828",
        dia_chi:"Thon Ai, phuong son, Luc Ngan",
        bac_si:"Can thi hang",
        tong_tien:"100000",

    }
    ,{
        ngay_kham : "20.22/22",
        ten_benh_nhan :"Caans van dat",
        so_dien_thoai:"09999282828",
        dia_chi:"Thon Ai, phuong son, Luc Ngan",
        bac_si:"Can thi hang",
        tong_tien:"100000",

    }
]
