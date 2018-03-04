import React from 'react';
import {Link} from 'react-router-dom';
import {Lightbox} from "primereact/components/lightbox/Lightbox.js";
import {Dropdown} from "primereact/components/dropdown/Dropdown";

export default class HomePage extends React.Component {
  state = {
    currentURL: 'http://moonwalk.cc/video/695d8fb033f5610e33008c52ee8718fe/iframe'
  };

  harryPotterFilms = [
    {
      label: 'Гарри Поттер и философский камень',
      value: 'http://moonwalk.cc/video/695d8fb033f5610e33008c52ee8718fe/iframe'
    },
    {
      label: 'Гарри Поттер и тайная комната',
      value: 'http://moonwalk.cc/video/53f471f602b8e2560270e732a0b5ca1e/iframe'
    },
    {
      label: 'Гарри Поттер и узник Азкабана',
      value: 'http://moonwalk.cc/video/fc9b734a2b7a9621c0f8a9389fd54122/iframe'
    },
    {
      label: 'Гарри Поттер и Кубок огня',
      value: 'http://moonwalk.cc/video/798ba1117436fdc4976143eb8c6ba9f5/iframe'
    },
    {
      label: 'Гарри Поттер и Орден Феникса',
      value: 'http://moonwalk.cc/video/1b62247f65a1676ebe8c6ac4b31a878e/iframe'
    },
    {
      label: 'Гарри Поттер и Принц-полукровка',
      value: 'http://moonwalk.cc/video/e50025e54b6b9d6134f2a19317408abe/iframe'
    },
    {
      label: 'Гарри Поттер и Дары Смерти. Часть 1',
      value: 'http://moonwalk.cc/video/3eb837a492d68e774ffd5cfea6e8f2d5/iframe'
    },
    {
      label: 'Гарри Поттер и Дары Смерти. Часть 2',
      value: 'http://moonwalk.cc/video/5b81761e776b2375ac17729078d2b6f5/iframe'
    },
    {label: 'Фантастические твари и места их обитания', value: 'http://moonwalk.cc/video/a7f2d078d30ea6a4/iframe'},
  ];

  render() {
    return (
      <div className="regular-page">
        <h2 className="regular-page__title">Приветствуем в тебя в Хогвартсе, фанат Гарри Поттера</h2>
        <div className="regular-page__plain-text">
          <div>
            Здесь ты сможешь наладить свой учебный процесс. Например, ты можешь:
            <ul>
              <li><Link to="/groups">общаться с людьми по интересам, читать и создавать новости,</Link></li>
              <li><Link to="/personal/timetable">составить свое расписание, чтобы эффективнее распределять
                время, </Link></li>
              <li><Link to="/personal/notes">создавать заметки, чтобы не забыть про самое важное, </Link></li>
              <li><Link to="/settings">редактировать свой профиль чтобы все узнали, какой ты на самом деле, </Link></li>
              <li>или просто посмотреть все части фильма про Гарри Поттера:</li>
            </ul>
          </div>

          <Dropdown className="dropdown" value={this.state.currentURL} options={this.harryPotterFilms}
                    onChange={e => this.setState({currentURL: e.value})} placeholder="Select a City"/>

          <Lightbox type="content">
            <a className="group" href="#">
              Смотреть фильм
            </a>
            <iframe width="560" height="315" src={this.state.currentURL}
                    frameBorder="0" allowFullScreen/>
          </Lightbox>
        </div>
      </div>
    )
  }
}