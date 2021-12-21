import React,{useState, useEffect, useImperativeHandle} from 'react'
import { Modal, Form, Input } from 'antd';


const ModalDrug = (props, ref) => {
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
        title={isEdit ? "Cập nhật" : "Thêm mới"}
        centered
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => closeModal()}
        width="50%"
      >
          <Form layout="horizontal"
               labelCol={{ span: 4 }}
               wrapperCol={{ span: 14 }}
                form={form}
                onFinish={onSubmit}
          >
             <Form.Item label="Tên thuốc" rules={[{ required: true, message: 'Tên thuốc' }]} name="ten_thuoc">
                <Input/>
             </Form.Item>
             <Form.Item label="Đơn vị tính" rules={[{ required: true, message: 'Đơn vị tính' }]} name="don_vi">
                <Input/>
             </Form.Item>
             <Form.Item label="Giá bán" rules={[{ required: true, message: 'Điền giá bán' , }]} name="gia_ban">
                <Input/>
             </Form.Item>
             <Form.Item label="Số lượng" rules={[{ required: true, message: 'Điền số lượng'  }, ]} name="so_luong">
                <Input/>
             </Form.Item>
          </Form>
      </Modal>
    )
}
export default React.forwardRef(ModalDrug)