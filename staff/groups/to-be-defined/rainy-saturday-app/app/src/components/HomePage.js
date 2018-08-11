import React, {Component} from 'react';
import './HomePage.css'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';

const items = [
  {
    src: 'https://images.ctfassets.net/niwziy2l9cvz/1bREqTCJn6omwwocqOI8Mi/8e7e6671c3cfd899fa32cf607f8b74ab/amsterdam-The-Battle-of-Waterloo-1500x630.jpg',
    altText: 'The Battle of Waterloo - Jan Willem Pieneman',
    caption: 'The Battle of Waterloo - Jan Willem Pieneman',
  },
  {
    src: 'http://3.bp.blogspot.com/-Cbzb5pcAizk/TrTqQchmGwI/AAAAAAAAAFg/7wioDG8FGog/w1200-h630-p-k-no-nu/rembrandt_night_watch.png',
    altText: 'Rembrand Van Rijn- De Nachtwacht',
    caption: 'Rembrand Van Rijn- De Nachtwacht',
  },
  {
    src: 'http://2.bp.blogspot.com/_vhl-SMfmDFI/SXj6hXKCuVI/AAAAAAAAC1c/SV1hEldoavo/w1200-h630-p-k-no-nu/Il+colosso+-+Goya.JPG',
    altText: 'IL COLOSSO (The Colossus) - Abraham van Beyeren',
    caption: 'IL COLOSSO (The Colossus) - Abraham van Beyeren',
  }
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionHeader={item.caption} captionText=""/>
        </CarouselItem>
      );
    });

    return (
      <Container className="mt-5">
        <Row>
          <Col>
        <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </Col>
      </Row>

      <Row className="mt-2"><Col><Jumbotron>
        <img className="App-logo" alt="van gogh" src="/images/gogh.jpg"/>

        <h1 className="mt-5">Plan your visit</h1>
        <h2 className="mt-3">Address</h2>
        <p>Rijksmuseum <br/>
          Museumstraat 1<br/>
          1071 XX Amsterdam<br/>
          Telephone: +31 (0) 20 6747 000</p>
        <h2  className="mt-3">Opening hours</h2>
        <p>9:00 to 17:00 daily, all days of the year: so the museum is also open on Christmas day, Boxing day and New Year's day
          The Rijksmuseum’s ticket desk closes at 16:30 <br/><br/>

          The Rijksmuseum Gardens, Rijks Shop and Café are also open to visitors without a ticket from 9:00 to 18:00.</p>
<h2  className="mt-3">Prices</h2>
        <p>Adults: € 17.50<br/>
          Children aged 18 and under, Museumkaart holders, I Amsterdam City Card, members of ICOM, ICOMOS, the Rembrandt Association (Vereniging Rembrandt), KOG, Stadspas, Vrienden van de Aziatische Kunst, Vrienden van het Rijksmuseum, BankGiro Lottery VIP-KAART: free admission<br/>
          Holders of CJP or EYCA: 50% reduction on regular ticket price</p>
      <h1 className="mt-5">About the Museum</h1>

      <h2  className="mt-3">From 1800 to 2013</h2>
      <p>The Rijksmuseum first opened its doors in 1800 under the name ‘Nationale Kunstgalerij’. At the time, it was housed in Huis ten Bosch in The Hague. The collection mainly comprised paintings and historical objects. In 1808, the museum moved to the new capital city of Amsterdam, where it was based in the Royal Palace on Dam Square.
After King Willem I’s accession to the throne, the paintings and national print collection were moved to the Trippenhuis on Kloveniersburgwal, while the other objects were returned to The Hague. The current building was put into use in 1885. The Netherlands Museum for History and Art based in The Hague moved into the same premises, forming what would later become the departments of Dutch History and Sculpture & Applied Art.</p>
<h2  className="mt-3">The beginning</h2>
<p>On 19 November 1798, more than three years after the birth of the Batavian Republic, the government decided to honour a suggestion put forward by Isaac Gogel by following the French example of setting up a national museum. The museum initially housed the remains of the viceregal collections and a variety of objects originating from state institutions. When the Nationale Kunstgalerij first opened its doors on 31 May 1800, it had more than 200 paintings and historical objects on display. In the years that followed, Gogel and the first director, C.S. Roos, made countless acquisitions. Their first purchase, The Swan by Jan Asselijn, cost 100 Dutch guilders and is still one of the Rijksmuseum’s top pieces.</p> </Jumbotron> </Col> </Row>
      <Row> <Col className="App-logo-rotate" sm="12" md={{ offset: 2 }}> </Col> </Row>
      </Container>
    );
  }
}


export default HomePage;