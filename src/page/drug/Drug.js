
import React, {useState, useEffect, useRef} from 'react'
import { api } from '../../api'
import { urlApi } from '../../urlApis'
import { common_post, formatCurrency } from '../../utils'
import "./drug.css"
import { Table, Row, Col, Button, notification } from 'antd'
import { EditOutlined , DeleteOutlined, PlusCircleFilled  } from '@ant-design/icons'
import ModalDrug from './ModalDrug'
export default function Drug() {
    
    useEffect(() => {
       initData()
    }, [])
    const modalDrug = useRef()
    const [drug, setDrug] = useState([])

    const initData = async () => {
        try {
            const response = await common_post(urlApi.GET_LIST_DRUG, {})
            console.log("response", response)
            if (response.status === "OK") {
                setDrug(response.result)
            }
        } catch (error) {
            
        }
    }

    ////
    const deleteDrug = async (id) => {
       
        try {
            const response = await common_post(urlApi.DELETE_DRG, {id})
            console.log("response", response)
            if (response.status === "OK") {
               initData()
            }
        } catch (error) {
            
        }
    }

    const onSubmit = async (values) => {
        try {
            const response = await common_post(urlApi.ADD_DRUG, values)
            console.log("response", response)
            if (response.status === "OK") {
               notification.success({message:"Thêm thuốc thành công !"})
               initData()
               modalDrug.current.closeModal()

            }
        } catch (error) {
            
        }
    }


    const onUpdate = async (values) => {
        try {
            const response = await common_post(urlApi.EDIT_DRUG, values)
            console.log("response", response)
            if (response.status === "OK") {
               notification.success({message:"Sửa thành công !"})
               initData()
               modalDrug.current.closeModal()

            }
        } catch (error) {
            
        }
    }

    const columns = [
        {
          title: 'Tên thuốc',
          dataIndex: 'ten_thuoc',
          key: 'ten_thuoc',
         
        },
        {
          title: 'Đơn vị tính',
          dataIndex: 'don_vi',
          key: 'don_vi',
        },
        {
          title: 'Giá bán',
          dataIndex: 'gia_ban',
          key: 'gia_ban',
          render : (gia_ban) => <span>{formatCurrency(gia_ban , "đ", true)}</span>
        },
        {
            title: 'Số lượng',
            dataIndex: 'so_luong',
            key: 'so_luong',
          },
        {
          title: 'Thao tác',
          key: 'id',
          dataIndex: 'id',
          render: (id, record) => (
            <>
             <Row>
                 <Col>
                    <Button
                        type='link'
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation()
                            modalDrug.current.openModal(record)
                        }}
                    />
                 </Col>
                 <Col>
                    <Button
                        type='link'
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation()
                            deleteDrug(record.id)
                        }}
                    />
                 </Col>
             </Row>
            </>
          ),
        },
      ];
    return (
        <div className='container'>
            <Row justify="space-between" align="middle" style={{marginBottom :"20px"}}>
                <Col style={{fontSize : "20px",fontWeight:"bold"}}>Danh sách thuốc</Col>
                <Col style={{}}>
                    <Button 
                        icon={<PlusCircleFilled/>}
                        onClick={() => modalDrug.current.openModal()}
                        style={{backgroundColor:"#2CB2A5", borderRadius:"10px", color:"#FFF"}}
                    >
                        Thêm thuốc
                    </Button>
                </Col>
            </Row>
           <Table columns={columns} dataSource={drug} pagination={false} />
           <ModalDrug ref = {modalDrug} onSubmit={onSubmit} onUpdate = {onUpdate}/>
        </div>
    )
}
