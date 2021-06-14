import React, { useState } from "react";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";

const MetaPanel = ({ isPrivateChannel, currentChannel = null, userPosts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActiveIndex = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const formatCount = (count) =>
    count > 1 || count === 0 ? `${count} posts` : `${count} post`;
  const displayTopPosters = (posts) =>
    Object.entries(posts)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([key, val], index) => {
        console.log("key", key);
        console.log("val", val);
        return (
          <List.Item key={index}>
            <Image avatar src={val.avatar} />
            <List.Content>
              <List.Header as="a">{key}</List.Header>
              <List.Description>{formatCount(val.count)}</List.Description>
            </List.Content>
          </List.Item>
        );
      })
      .slice(0, 5);

  return (
    !isPrivateChannel && (
      <Segment loading={!currentChannel}>
        <Header as="h3" attached="top">
          About # {currentChannel && currentChannel.name}
        </Header>
        <Accordion styled attached="true">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleSetActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {currentChannel && currentChannel.details}
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleSetActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="user circle" />
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List>{userPosts && displayTopPosters(userPosts)}</List>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleSetActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Header>
              <Image
                circular
                src={currentChannel && currentChannel.createdBy.avatar}
              />
              {currentChannel && currentChannel.createdBy.name}
            </Header>
          </Accordion.Content>
        </Accordion>
      </Segment>
    )
  );
};

export default MetaPanel;
