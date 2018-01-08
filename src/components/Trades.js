import React from 'react';
import {
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import USD from './USD';

const Trades = ({ ticker, symbol, stock, date, quantity, onChangeQuantity }) => (
  <div className="Trade">
    <h1>Trade</h1>
    <div className="row">
      <div className="col">
        <h2>Company: {ticker.name}</h2>
        <h2>Symbol: {symbol.toUpperCase()}</h2>
        <h3>Date: {date}</h3>
        <div className="row">
          <div className="col">
            <FormGroup check>
              <Label check>
                <Input type="radio" name="buy_sell" defaultChecked/>{' '}
                Buy
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="buy_sell" />{' '}
                Sell
              </Label>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup>
              <Label for="quantity">
                Quantity
              </Label>
              <Input
                id="quantity"
                placeholder="quantity"
                type="number"
                min={1}
                value={quantity}
                className="form-control"
                onChange={onChangeQuantity} />
            </FormGroup>
          </div>
        </div>
        <div className="text-right">
          <h3>
            Price per share: <USD amount={stock.close} />
          </h3>
          <h3>x {quantity}</h3>
          <hr/>
          <h3>
            Total: <USD amount={stock.close * quantity} />
          </h3>
        </div>
        <FormGroup>
          <Button>Submit</Button>
        </FormGroup>
      </div>
    </div>
  </div>
);

export default Trades;
