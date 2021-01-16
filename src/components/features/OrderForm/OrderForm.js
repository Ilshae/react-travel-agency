import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import { formatPrice } from '../../../utils/formatPrice';
import settings from '../../../data/settings';
import { calculateTotal } from '../../../utils/calculateTotal';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripName, tripId, tripCountry) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  if(options.name == '' || options.contact == ''){
    alert('Name or Contact is empty');
  }
  else{
    const payload = {
      ...options,
      totalCost,
      country: tripCountry.name,
      countryCode: tripCountry.alpha3Code,
      tripId,
      tripName,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      });
  }
};

const OrderForm = ({ tripCost, options, setOrderOption, tripName, tripId, tripCountry }) => {
  return (
    <Grid>
      <Row>
        {pricing.map(option => <Col key={option.id} md={4}>
          <OrderOption currentValue = {options[option.id]} {...option} 
            setOrderOption={setOrderOption} /></Col>)}
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options}/>
          <Button onClick={() => sendOrder(options, tripCost, tripName, tripId, tripCountry)}>Order now!</Button>
        </Col>
      </Row>
    </Grid>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  tripCountry: PropTypes.object,
};

export default OrderForm;
