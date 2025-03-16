import { Content } from "antd/es/layout/layout";
import { Col, Row } from "antd";

function DataContainer({children}) {

    return (
        <Content>
        <Row justify="center" gutter={[16, 16]} style={{ padding: '0 20px' }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={20}>
            <div className="my-div">
            {children}
            </div>
          </Col>
        </Row>
      </Content>
    );
}

export default DataContainer;
