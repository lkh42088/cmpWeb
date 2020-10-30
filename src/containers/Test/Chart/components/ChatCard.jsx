import React, {useEffect, useState, Fragment} from 'react';
import {
    Card, Col, CardBody, Container, Row,
} from 'reactstrap';
import CustomActiveShapePieChart from './CustomActiveShapePieChart';
import LineChartWithReferenceLines from './LineChartWithReferenceLines';
import ChartPie2 from './ChatPie2';

// eslint-disable-next-line no-undef
//const {PieChart, Pie, Sector} = Recharts;

const ChatCard = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">test</h3>
                <h3 className="page-subhead subhead">
                    Use this elements, if you want to show some hints or additional information
                </h3>
            </Col>
        </Row>
        {/*<Row>
            <CustomActiveShapePieChart/>
            <CustomActiveShapePieChart/>
            <CustomActiveShapePieChart/>
        </Row>*/}
        <Row>
            {/*<LineChartWithReferenceLines/>*/}
            <ChartPie2/>
        </Row>
    </Container>
);
/*
    <Col md={12} lg={12}>
        <Card>
            <CardBody>
                <ChatPie/>
            </CardBody>
        </Card>
    </Col>

const ChatCard = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (index) => {
        console.log("test : ", index);
        setActiveIndex(index);
    };

    return (
        <Col md={12} lg={12}>
            <Card>
                <CardBody>
                    <PieChart width={800} height={400}>
                        <Pie
                            activeIndex={activeIndex === undefined ? 0 : activeIndex}
                            dataKey="value"
                            activeShape={ChatPie}
                            data={data}
                            cx={300}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            onMouseEnter={onPieEnter}
                        />
                    </PieChart>
                </CardBody>
            </Card>
        </Col>
    );
};*/


export default ChatCard;
