import React, { useState, useEffect, useImperativeHandle } from "react";
import { Modal, Form, Input, Col, Row, Select, notification, Table, Button, InputNumber } from "antd";
import moment from "moment";
import { common_post, formatCurrency } from "../../utils";
import { urlApi } from "../../urlApis";
import { DeleteFilled } from "@ant-design/icons";

const CreateAppointment = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [dataDoctor, setDataDoctor] = useState([])
  const [dataDrug , setDataDrug] = useState([])
  const [selectDrug, setSelectDrug] = useState([])
  const [totalMoneyDrug, setTotalMoneyDrug] = useState(0)
  const [totalMoney, setTotalMoney] = useState(0)
  const [price , setPrice] = useState(0)
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    openModal: (current) => {
      openModal();
      if (current) {
        setCurrentData(current)
        setData(current)
      }
    },
    closeModal: () => {
      closeModal();
    },
  }));

  useEffect(() => {
     getDoctor()
     getDataDrug()
  }, [])

  useEffect(() => {
    caculationMoney()
  }, [selectDrug,price])

  const setData = (data) => {
    console.log(data)
    setTotalMoney(data.total_price)
    form.setFields([
      {name:"name" , value:data.name},
      {name:"phone", value:data.phone},
      {name:"address", value:data.address},
      {name:"price", value:data.price},
      {name:"chan_doan", value:data.chan_doan},
      {name : "doctor" , value:data.doctor_name}
    ])
    setPrice(data.price)
    setSelectDrug(data.thuoc)
  }
  const caculationMoney = () => {
    let totalDrug = 0
    for (let index = 0; index < selectDrug.length; index++) {
        const item = selectDrug[index];
         
        totalDrug = totalDrug + (item.total * item.gia_ban)
    }
    setTotalMoneyDrug(totalDrug)
    setTotalMoney(totalDrug +  price)
  }

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setIsEdit(false);
    setTotalMoney(0);
    setTotalMoneyDrug(0)
    setSelectDrug([])
    setPrice(0)
    currentData && setCurrentData();
    form.resetFields();
  };
  const onSubmit = (values) => {
    console.log(values)
    let dataRequest =  {
      ...values ,
      doctor : JSON.parse(values.doctor) ,
      thuoc : selectDrug, 
      total_price : totalMoney
    }
    props.onCreate(dataRequest)
    console.log(dataRequest)
  };


  const getDoctor = async () => {
      try {
          let res = await common_post(urlApi.GET_DOCTOR, {})
          console.log(res)
          if (res.status === "OK") {
              setDataDoctor(res. result)
          }
      } catch (error) {
          
      }
  }

  const getDataDrug = async () => {
      try {
        let res = await common_post(urlApi.GET_LIST_DRUG, {})
        console.log(res)
        if (res.status === "OK") {
            setDataDrug(res. result)
        } 
      } catch (error) {
          
      }
  }


  const onSelectDrug = (value) => {
      console.log(JSON.parse(value))
      let data ={ ... JSON.parse(value), total : 1}
      console.log(data)
        if (selectDrug.length > 0) {
            let check = selectDrug.find(item => item.id === data.id)
            if (check) {
                notification.warning({message :"Thuốc đã được chọn"})
                return
            }
        }
        console.log(data)
      setSelectDrug(selectDrug.concat(data))
  
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
        title: 'Tồn kho',
        dataIndex: 'so_luong',
        key: 'so_luong',
      },
    {
        title: 'Số lượng',
        dataIndex: 'total',
        key: 'total',
        render : (e , record) => (
            <InputNumber
                style={{witdh : "100px"}}
                value={record.total}
                max={record.so_luong}
                min={0}

                onChange={(number) => {
                  
                    let data = selectDrug.map(item => {
                        if (item.id === record.id) {
                            return {... item , total : number}
                        }else{
                            return item
                        }
                    })
                    setSelectDrug(data)
                
                } }
            />
        )
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
                        icon={<DeleteFilled />}
                        onClick={(e) => {
                            e.stopPropagation()
                            let newValue = selectDrug.filter(item => item.id !== record.id)
                            setSelectDrug(newValue)
                        }}
                    />
            </Col>
         </Row>
        </>
      ),
    },
  ];

  return (
    <Modal
      title={isEdit ? "Chi tiết" : "Thêm mới"}
      centered
      visible={visible}
      onOk={() => currentData ? closeModal() : form.submit()}
      onCancel={() => closeModal()}
      width="70%"
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Row>
          <Col>
            <span>Thông tin cơ bản </span>
            <span>Thời gian </span>
            <span>{moment(currentTime).format("LT")} </span>

            <span> Ngày {moment(currentTime).format("L")}</span>
          </Col>
        </Row>
        <Row gutter={20} style={{marginTop: "20px"}}>
          <Col span={8}>
            <Form.Item
              label="Tên bệnh nhân"
              rules={[{ required: true, message: "Tên bệnh nhân" }]}
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Số điện thoại"
              rules={[{ required: true, message: "Số điện thoại" }]}
              name="phone"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Địa chỉ"
              rules={[{ required: true, message: "Địa chỉ" }]}
              name="address"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Giá khám"
              rules={[{ required: true, message: "Điền giá khám" }]}
              name="price"
            >
              <InputNumber onChange={(e) => setPrice(e) }  style={{width : "100%"}}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Bác sĩ"
              rules={[{ required: true, message: "Chọn bác sĩ" }]}
              name="doctor"
            >
            <Select >
                {dataDoctor.map((item, index) => {
                    return (
                        <Select.Option value={JSON.stringify(item)} key={index}>{ item.firstname + " " + item.lastname}</Select.Option>
                    )
                })}
            </Select>
            </Form.Item>
          </Col>
         
        </Row>

        <Row gutter={20}>
            <Col span={12}>
                <Form.Item label="Chẩn đoán" name="chan_doan" initialValue="">
                    <Input/>

                </Form.Item>
            </Col>
        <Col span={12}>
               <Form.Item label="Thuốc" name="sss">
               <Select onChange={onSelectDrug}>
                {dataDrug.map((item, index) => {
                    return (
                        <Select.Option value={JSON.stringify(item)} key={index}>{item.ten_thuoc}</Select.Option>
                    )
                })}
                </Select>
               </Form.Item>
          </Col>
        </Row>

       
         <Table columns={columns} dataSource={selectDrug} pagination={false} />
        <Row style={{marginTop:"10px"}}>
            <Col span={10}>
               
                <span>Tiền thuốc : </span>
               
              
            </Col>
            <Col span={10}>
            <span>{formatCurrency(totalMoneyDrug , "đ", true)} đồng</span>
            </Col>

        </Row>
        <Row style={{marginTop:"20px"}}>
            <Col span={10}>
              
                <span>Tổng tiên (Tiền thuốc + tiền khám) : </span>
               
            </Col>
            <Col span={10}>
            <span>{formatCurrency(totalMoney, "đ", true)} đồng</span>
            </Col>

        </Row>
      </Form>
    </Modal>
  );
};
export default React.forwardRef(CreateAppointment);
