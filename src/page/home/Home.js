import React, {useState, useEffect} from 'react'
import { urlApi } from '../../urlApis'
import { common_post, formatCurrency } from '../../utils'
import moment from 'moment'
import { Row, Col, Divider } from 'antd'
import "./home.css"
export default function Home() {

    const [total, setTotal] = useState()
    const [totalMoth , setTotalMoth] = useState([])
    const [totalDoctor , setTotalDoctor] = useState([])


    useEffect(() => {
       let ngay_dau_tien = moment().startOf('month').valueOf()
        initData(ngay_dau_tien)
    }, [])

    const initData = async (time) => {
        try {
            let response = await common_post(urlApi.GET_INFO_DASHBOARD, {time : time }, {})
            console.log(response)
                if (response.status === "OK") {
                    setTotal(response.result.total)
                    setTotalMoth(response.result.moth)
                    setTotalDoctor(response.result.total_doctor)
                }
        } catch (error) {
            
        }
    }
    return (
        <div style={{width :"100%"}}>
           <Row>
               <span className='title'>Tổng quan</span>
           </Row>
          {total &&  <Row  justify="space-between">
                <Col>
                    <span className='text' >Tổng số cuộc khám : <span className='value'>{total.total_appointment}</span></span>
                </Col>
                <Col>
                    <span  className='text'>Tổng tiền khám : <span className='value'>
                    {formatCurrency(Number(total.total_money), "đ", true)}
                        </span></span>
                </Col>
           </Row>}
           <Divider />
           <span  className='title'>Thống kê tháng này</span>
            <Row  justify="space-between">
                {totalMoth.map((item,index) => {
                    return(
                        <Col>
                            <p  className='text'>Bác sĩ : <span className='value'>
                                
                            {item.doctor_name}</span></p>
                            <p  className='text'>Tổng cuộc khám: <span className='value'>
                            {item.cuoc_kham_thang}</span></p>
                            <p  className='text'>Tổng tiền khám: <span className='value'>
                            {formatCurrency(Number(item.tien_kham_thang), "đ", true)}</span></p>
                        </Col>
                    )

                })}

            </Row>
            <Divider  />
            <span  className='title'>Thống kê theo bác sĩ</span>
            <Row gutter={20} justify="space-between">
                {totalDoctor.map((item,index) => {
                    return(
                        <Col>
                            <p  className='text'>Bác sĩ : <span className='value'>
                            {item.doctor_name}</span></p>
                            <p  className='text'>Tổng cuộc khám: <span className='value'>
                            {item.cuoc_kham_tong}</span></p>
                            <p  className='text'>Tổng tiền khám: <span className='value'>
                            {formatCurrency(Number(item.tien_kham_tong), "đ", true)}</span></p>
                        </Col>
                    )

                })}

            </Row>
        </div>
    )
}
