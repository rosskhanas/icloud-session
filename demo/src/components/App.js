import React, { Component } from 'react';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/dist/light';
import js from 'highlight.js/lib/languages/javascript';
import syntaxTheme from 'react-syntax-highlighter/dist/styles/vs';
import {
  AppContainer,
  Content,
  Footer,
  Header,
  Link,
  Paragraph,
  SubTitle,
  Title,
} from 'ross-ui';
import ContentCenter from '../components-styled/ContentCenter';
import GitHubImage from '../components-styled/GitHubImage';
import Input from '../components-styled/Input';
import InputContainer from '../components-styled/InputContainer';

registerLanguage('javascript', js);

export default class App extends Component {

  state = {
    email: 'email',
    password: 'password',
  }

  onEmailValueChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  onPasswordValueChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    const repositoryLink = 'https://github.com/rtkhanas/icloud-session';
    const codeString = `
import iCloud from 'icloud-session';

iCloud.login({
  apple_id: '${this.state.email}',
  password: '${this.state.password}',
}, (err, session) => {
  if (err) {
    throw new Error('nope');
  }
  console.log(session);
  iCloud.saveSession('session.json', session);
});

// or, if you have stored session:
iCloud.loadSessionFile('session.json', (err, session) => {
  if (err) {
    throw new Error('Try refreshing your credentials (session has expired)');
  }
  console.log(body);
});
`;
    return (
      <AppContainer>
        <Link href={repositoryLink} >
          <GitHubImage
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
          />
        </Link>
        <Header>
          <Title>iCloud Session</Title>
          <Paragraph>
            An iCloud session management API.
          </Paragraph>
          <Paragraph>
            A project by <Link href="https://rtkhanas.github.io/">Ross Khanas</Link>.
          </Paragraph>
        </Header>
        <Content>
          <SubTitle>Demo</SubTitle>
          <ContentCenter>
            <InputContainer>
              <Input type="text" value={this.state.email} onChange={this.onEmailValueChange} />
            </InputContainer>
            <InputContainer>
              <Input type="text" value={this.state.password} onChange={this.onPasswordValueChange} />
            </InputContainer>
            <Paragraph>
              The demo is not possible, because of cors. But it works on a server.
            </Paragraph>
            <Paragraph>
              Please, check <Link href={`${repositoryLink}/tree/master/demo`}>demo-nodejs</Link> for nodejs demo.
            </Paragraph>
          </ContentCenter>
          <SubTitle>Code</SubTitle>
          <SyntaxHighlighter language="js" style={syntaxTheme}>
            {codeString}
          </SyntaxHighlighter>
        </Content>
        <Footer>
          Released under the <Link href={`${repositoryLink}/blob/master/LICENSE`}>MIT license</Link>. <Link href={repositoryLink} >View source</Link>.
        </Footer>
      </AppContainer>
    );
  }
}
