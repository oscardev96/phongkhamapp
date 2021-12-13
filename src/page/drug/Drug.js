
import React, {useState, useEffect} from 'react'
import { api } from '../../api'
import { urlApi } from '../../urlApis'
import { common_post } from '../../utils'
import "./drug.css"
import { Table, Row, Col, Button } from 'antd'
import { EditOutlined , DeleteOutlined, PlusCircleFilled  } from '@ant-design/icons'
export default function Drug() {

    useEffect(() => {
       initData()
    }, [])

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
        console.log(id)
        try {
            const response = await common_post(urlApi.DELETE_DRG, {id})
            console.log("response", response)
            if (response.status === "OK") {
               initData()
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
                            console.log(record)
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
                <Col style={{fontSize : "20px"}}>Danh sách thuốc</Col>
                <Col>
                    <Button 
                        icon={<PlusCircleFilled/>}
                        onClick={() => {alert("them thuoc")}}
                    >
                        Thêm thuốc
                    </Button>
                </Col>
            </Row>
           <Table columns={columns} dataSource={drug} pagination={false} />
        </div>
    )
}
