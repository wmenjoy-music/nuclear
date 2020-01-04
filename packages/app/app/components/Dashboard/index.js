import React from 'react';
import { Tab } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import BestNewMusicTab from './BestNewMusicTab';
import ChartsTab from './ChartsTab';
import GenresTab from './GenresTab';

import styles from './styles.scss';

@withTranslation('dashboard')
class Dashboard extends React.Component {

  panes () {
    const {
      actions,
      dashboardData,
      history,
      streamProviders,
      t
    } = this.props;

    const {
      artistInfoSearchByName,
      albumInfoSearchByName,
      addToQueue,
      selectSong,
      clearQueue,
      startPlayback
    } = actions;

    return [
      {
        menuItem: t('best'),
        render: () => (
          <BestNewMusicTab
            dashboardData={dashboardData}
            artistInfoSearchByName={artistInfoSearchByName}
            albumInfoSearchByName={albumInfoSearchByName}
            history={history}
            addToQueue={addToQueue}
            selectSong={selectSong}
            clearQueue={clearQueue}
            startPlayback={startPlayback}
            streamProviders={streamProviders}
          />
        )
      },
      {
        menuItem: t('top'),
        render: () => (
          <ChartsTab
            topTracks={dashboardData.topTracks}
          />
        )
      },
      {
        menuItem: t('genres'),
        render: () => (
          <GenresTab
            genres={dashboardData.topTags}
            history={history}
          />
        )
      }
      /* {
        menuItem: 'Events',
        render: () => {
          return null;
        },
      },*/
    ];
  }

  componentDidMount () {
    this.props.actions.loadBestNewTracks();
    this.props.actions.loadBestNewAlbums();
    this.props.actions.loadTopTags();
    this.props.actions.loadTopTracks();
  }

  render () {
    return (
      <div className={styles.dashboard}>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={this.panes()}
          className={styles.dashboard_tabs}
        />
      </div>
    );
  }
}

export default Dashboard;
