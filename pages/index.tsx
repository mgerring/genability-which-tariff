import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from 'next/image';

import GenabilityClient from '../util/GenabilityClient';
import { restApis } from '@genability/api';
import { Fields, SortOrder } from '@genability/api/dist/rest-client/contract';
import { LoadServingEntity, ServiceType } from '@genability/api/dist/types';

const countries = [
  ['United States','US'],
  ['Australia','AU'],
  ['Canada','CA'],
  ['Mexico','MX'],
  ['Netherlands','NL'],
  ['Palau','PW']
];

export default function Home() {
  const [lseList, setLseList] = useState([]);
  const [tariffList, setTariffList] = useState([]);

  const [addressData, setAddressData] = useState({
    countryCode: 'default',
    zipCode: ''
  });

  const [selectedLse, setSelectedLse] = useState();

  const handleInput = (event) => setAddressData({
    ...addressData,
    [event.currentTarget.id]: event.currentTarget.value
  });

  async function fetchLses() {
    const request = new restApis.GetLoadServingEntitiesRequest();
    request.country = addressData.countryCode;
    request.postCode = addressData.zipCode;
    request.serviceTypes = [ServiceType.ELECTRICITY];
    request.sortOn = ['totalCustomers'];
    request.sortOrder = [SortOrder.DESC];
    request.fields = Fields.EXTENDED;
    const lses = await GenabilityClient.lses.getLoadServingEntities(request);
    setLseList(lses.results);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedLse(undefined);
    fetchLses();
  }

  async function fetchTariffs() {
    const request = new restApis.GetTariffsRequest();
    request.lseId = selectedLse;
    request.zipCode = addressData.zipCode;
    request.isActive = true;
    request.sortOn = ['customerCount'];
    request.sortOrder = [SortOrder.DESC];
    request.fields = Fields.EXTENDED;
    const tariffs = await GenabilityClient.tariffs.getTariffs(request);
    setTariffList(tariffs.results);
  }

  function handleReset(e) {
    setAddressData({
      countryCode: 'default',
      zipCode: ''
    });
    setLseList([]);
    setSelectedLse(undefined);
    setTariffList([]);
  }

  useEffect(() => {
    if (!selectedLse) return;
    fetchTariffs();
  }, [selectedLse])

  return (
    <>
      <Head>
        <title>Genability Sample App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid d-flex flex-column full-height">
        <Row as="header" className={"hero-background justify-content-center align-items-center pt-5 pb-5 " + (lseList.length == 0 ?  "flex-grow-1" : "flex-grow-0")}>
            <Col md="8">
              <h1 className="text-center light-text">What Tariff am I on?</h1>
              <Form inline onSubmit={handleSubmit} onReset={handleReset} className="justify-content-center">
                
                <Form.Group controlId="countryCode">
                  <Form.Label srOnly>Country</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={addressData.countryCode} 
                    onChange={handleInput}
                    className="mb-2 mr-sm-2"
                  >
                    <option disabled value="default">Country...</option>
                    {countries.map(country =>
                      <option key={country[1]} value={country[1]}>{country[0]}</option>
                    )}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="zipCode">
                  <Form.Label srOnly>Postal Code</Form.Label>
                  <Form.Control 
                    placeholder="Postal Code..." 
                    value={addressData.zipCode} 
                    type="text" 
                    onChange={handleInput}
                    className="mb-2 mr-sm-2"
                  />
                </Form.Group>

                <Button 
                  type="submit"
                  className="mb-2 mr-sm-2"
                >
                  Search
                </Button>
                {lseList.length > 0 && <Button
                  variant="secondary" 
                  type="reset"
                  className="mb-2 mr-sm-2"
                >
                  Reset
                </Button>}
              </Form>
            </Col>
        </Row>

        {lseList.length > 0 && <Row as="main" className="flex-grow-1">
          <div className="container">
          <Row className="justify-content-center mt-5 mb-5 transition-all">
          {lseList &&
            <Col md="6" className="transition-all">
              <ul className="list-group">
                {lseList.map((lse, idx) => 
                  <a 
                    href="#"
                    key={idx}
                    style={{cursor:'pointer'}}
                    onClick={() => setSelectedLse(lse.lseId)}
                    className={"list-group-item list-group-item-action " + (selectedLse == lse.lseId ? 'active' : '')}
                  >
                    <Row>
                      <Col xs={4} className="text-center">
                        <img style={{maxWidth:'100%',maxHeight:'50px'}} src={"https://cdn.genability.com/lses/"+ lse.lseId + ".png"} />
                      </Col>
                      <Col xs={8}>
                        {lse.name}
                      </Col>
                    </Row>
                  </a>
                )}
              </ul>
            </Col>
          }
          {selectedLse &&
            <Col md="6" className="transition-all">
              <ul className="list-group">
                {tariffList.map((tariff, idx) => 
                  <li 
                    key={idx}
                    className="list-group-item"
                  >
                    {tariff.tariffCode} {tariff.tariffName}
                  </li>
                )}
              </ul>
            </Col>
          }
          </Row>
          </div>
        </Row>}
        
        <Row as="footer" className="footer-background pt-3 pb-3">
          <Col className="text-center">
            <a href="https://genability.com" target="_blank">
              <Image src="/powered_by_genability.png" alt="Powered by Genability" width={169} height={52} />
            </a>
          </Col>
        </Row>
      </div>
    </>
  )
}
