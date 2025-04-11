import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';
import './index.less';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户总数"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="文件总数"
              value={93}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="团队数量"
              value={12}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 