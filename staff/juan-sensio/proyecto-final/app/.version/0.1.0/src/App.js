import React, { Component } from 'react';
import Main from './components/Main'
import Settings from './components/Settings'
import Profile from './components/Profile'
import './App.css'
class App extends Component {
  state = {
    settings: true,
    profile: true,
    main: true,
    layout: 1,
    mainSrc: ''
  }

  setLayout = () => {
    const w = window.innerWidth
    if (w > 800) 
      this.setState({ layout: 1, settings: true, profile: true })
    else if (w > 400 && w <= 800) 
      this.setState({ layout: 2, settings: false, profile: true})
    else 
      this.setState({ layout: 3, settings: false, profile: false})
  }
  componentWillMount = () => this.setLayout()
  componentDidMount = () => window.addEventListener('resize', this.setLayout)
  componentWillUnmount = () => window.removeEventListener('resize', this.setLayout)

  toggleSettings = () => {
    const { layout } = this.state
    if (layout === 1)
      this.setState({ settings: !this.state.settings })
    else if (layout === 2)
      this.setState({ settings: !this.state.settings, profile: this.state.profile ? false : false })
    else if (layout === 3)
      this.setState({ profile: false, settings: !this.state.settings, main: !this.state.main })

  }
  toggleProfile = () => {
    const { layout } = this.state
    if (layout === 1)
      this.setState({ profile: !this.state.profile })
    else if (layout === 2)
      this.setState({ profile: !this.state.profile, settings: this.state.settings ? false : false })
    else if (layout === 3)
      this.setState({ profile: !this.state.profile, settings: false, main: !this.state.main })
  }

  setMainSrc = mainSrc => this.setState({mainSrc})

  render() {
    let { settings, profile, main, mainSrc } = this.state
    const { toggleSettings, toggleProfile, setMainSrc } = this

    const layout = 'app'
      + (settings ? '-settings' : '')
      + (profile ? '-profile' : '')

    return (
      <div className={layout}>
        {settings && <Settings onClose={toggleSettings} />}
        {main && <Main
          settings={settings}
          openSettings={toggleSettings}
          profile={profile}
          openProfile={toggleProfile}
          mainSrc={mainSrc}
        />}
        {profile && <Profile onClose={toggleProfile} setMainSrc={setMainSrc}/>}
      </div>
    )
  }
}

export default App;
