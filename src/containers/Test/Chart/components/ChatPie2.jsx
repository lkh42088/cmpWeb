// import React, {
//     Fragment, useEffect, useRef, useState,
// } from 'react';
// import {Col, Container, Row} from 'reactstrap';
// import { select } from "d3";
//
// const ChartPie2 = () => {
//     const svgRef = useRef;
//     //const [data, setData] = useState([5, 20, 25, 30]);
//
//     const data = [5, 20, 25, 30];
//
//     const svg = select(svgRef.current);
//     svg
//         .selectAll("circle")
//         .data(data)
//         .join(
//             enter => enter.append("circle"),
//             update => update.attr("class", "update"),
//             exit => exit.remove(),
//         )
//         .attr("r", value => value)
//         .attr("cx", value => value * 2)
//         .attr("cy", value => value * 2)
//         .attr("stroke", "red");
//
//     return (
//         <Container>
//             <Row>
//                 <Col md={12}>
//                     <div className="widget">
//                         <div className="header">Batch Process Count</div>
//                         <svg ref={svgRef}><circle/></svg>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default ChartPie2;
