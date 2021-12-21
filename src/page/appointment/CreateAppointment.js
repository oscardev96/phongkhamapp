import React,{useState, useEffect, useImperativeHandle} from 'react'
import { Modal, Form, Input, Col, Row } from 'antd';
import moment from 'moment';

const CreateAppointment = (props, ref) => {
    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentData, setCurrentData] = useState()
    const [form] = Form.useForm()
    useImperativeHandle(
        ref,
        () => ({
            openModal:(current) => {
                openModal()
                if (current) {

                    console.log("current data", current)
                    setIsEdit(true)
                    setCurrentData(current)
                    form.setFields([
                        {name : "ten_thuoc" , value:current.ten_thuoc},
                        {name : "don_vi" , value:current.don_vi},
                        {name : "gia_ban" , value:current.gia_ban},
                        {name : "so_luong" , value:current.so_luong},

                    ])
                }
            },
            closeModal : () => {
                closeModal()
            }
        }),
        
    )


    const openModal = () => {
        setVisible(true)
    }

    const closeModal = () => {
        setVisible(false)
        setIsEdit(false)
        currentData && setCurrentData()
        form.resetFields()
    }
    const onSubmit = (values) => {
       console.log(values)
        if (isEdit) {
            props.onUpdate({...values, id : currentData.id})
        }else{
            props.onSubmit(values)
        }
    }

    return (
        <Modal
        title={isEdit ? "Chi tiết" : "Thêm mới"}
        centered
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => closeModal()}
        width="70%"
      >
          <Form
                form={form}
                onFinish={onSubmit}
          >
            <Row>
                <Col>
                    <span>Thông tin cơ bản </span>
                    <span>Thời gian </span> 
                    <span>{moment(Date.now()).format('LT')}</span>
                    <span>{ moment(Date.now()).format("L")}</span>
                </Col>
            </Row>
             <Form.Item label="Tên bệnh nhân" rules={[{ required: true, message: 'Tên thuốc' }]} name="ten_benh_nhan">
                <Input/>
             </Form.Item>
             <Form.Item label="Số điện thoại" rules={[{ required: true, message: 'Đơn vị tính' }]} name="so_dien_thoai">
                <Input/>
             </Form.Item>
             <Form.Item label="Địa chỉ" rules={[{ required: true, message: 'Điền giá bán' , }]} name="dia_chi">
                <Input/>
             </Form.Item>
             <Form.Item label="Giá khám" rules={[{ required: true, message: 'Điền số lượng'  }, ]} name="gia_kham">
                <Input/>
             </Form.Item>
          </Form>
      </Modal>
    )
}
export default React.forwardRef(CreateAppointment)