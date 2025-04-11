import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Line } from '@ant-design/plots';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './index.less';

const Dashboard: React.FC = () => {
  // 模拟数据
  const data = [
    { date: '2024-01', value: 100 },
    { date: '2024-02', value: 120 },
    { date: '2024-03', value: 150 },
    { date: '2024-04', value: 200 },
    { date: '2024-05', value: 180 },
    { date: '2024-06', value: 220 },
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    smooth: true,
    lineStyle: {
      stroke: '#1890ff',
      lineWidth: 2,
    },
    areaStyle: {
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    },
  };

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={1128}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日访问"
              value={93}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="次"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="转化率"
              value={12.5}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均停留"
              value={8.9}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="分钟"
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 16 }} title="访问趋势">
        <Line {...config} />
      </Card>
    </div>
  );
};

export default Dashboard; 