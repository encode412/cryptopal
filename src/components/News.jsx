import React, { useRef, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
4;
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
  });
  const { data } = useGetCryptosQuery(100);
  const updatedNews = cryptoNews?.items.slice(0, 7);
  const ref = useRef("noreferrer");
  if (!updatedNews) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowercase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {updatedNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.newsUrl} target="_blank" ref={ref}>
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: "150px", maxHeight: "100px" }}
                  src={news?.images?.thumbnail || demoImage}
                  alt="news"
                />
              </div>
              <p>{news.snippet}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news?.images?.thumbnail} />
                  <Text className="provider-name">{news.publisher}</Text>
                </div>
                <Text>
                  {moment(news?.timestamp, "x").format("dddd, MMMM Do YYYY")}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
