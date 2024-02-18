import React from "react";
import { Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const count = simplified ? 6 : 50;
  const { data: cryptoNews } = useGetCryptoNewsQuery();

  if (!cryptoNews?.data) return <Loader />;

  const slicedCryptoNews = cryptoNews?.data?.slice(0, count);

  return (
    <Row gutter={[24, 24]}>
      {slicedCryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.thumbnail}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100
                  ? `{news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar />
                  <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
