import './App.css';
import { Container, Group, Grid, Col, Text, Title, Card, Image, Button, Avatar, Stack } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandYoutube } from '@tabler/icons-react';
import projects from './projects';

export function SocialButton({name, href, icon}) {
  return (
    <Button
      component="a"
      aria-label={name}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="dark"
      leftIcon={icon}
      variant="subtle"
    >
    </Button>
  );
}

export function ProjectCard({title, description, thumbnail, href}) {
  return (
    <Card
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="projectCard"
      withBorder
      shadow="sm"
      radius="md"
      h="100%"
    >
      <Card.Section>
        <Image src={thumbnail} height={180} alt={title} withPlaceholder/>
      </Card.Section>
      <Title order={4} mt="md" className="title">{title}</Title>
      <Text size="sm" color="dimmed" mt="xs" className="text">{description}</Text>
    </Card>
  );
}

function App() {
  return (
    <Container mt="xl" mb="xl">
      <Stack align="center" spacing="xs" mb="xl">
        <Avatar src="josh_pfp_700.png" alt="Josh Manzano" size={120} radius={120}/>
        <Title order={2} className="title" align="center">
          Josh Manzano
        </Title>
        <Text size="lg" className="text" align="center" maw={600}>
          Hello there! I'm Josh, a software engineer and AP Instructor. I like building things for small businesses and teaching people about Computer Science or Cybersecurity.
        </Text>
        <Group position="center" spacing={0}>
          <SocialButton name='GitHub' href='https://github.com/joshmzndev' icon={<IconBrandGithub color='black'/>}/>
          <SocialButton name='LinkedIn' href='https://www.linkedin.com/in/joshmanzano-dev/' icon={<IconBrandLinkedin color='black'/>}/>
          <SocialButton name='YouTube' href='https://youtube.com/@joshmzndev' icon={<IconBrandYoutube color='black'/>}/>
        </Group>
      </Stack>

      <Grid gutter="lg">
        {projects.map((project) => (
          <Col key={project.title} span={12} sm={6} md={4}>
            <ProjectCard {...project}/>
          </Col>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
