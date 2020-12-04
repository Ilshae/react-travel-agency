import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate link to the correct address', () => {
    const expectedResult ='/trip/abc';
    const expectedId = 'abc';
    const expectedTags=['title', 'hello', 'text'];
    const component = shallow(<TripSummary id={expectedId} tags={expectedTags}/>);
    expect(component.find('Link').prop('to')).toEqual(expectedResult);
  });

  it('should render correct src and alt for image', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'photo';
    const expectedTags=['title', 'hello', 'text'];
    const component = shallow(<TripSummary tags={expectedTags} image={expectedSrc} name={expectedAlt}/>);
  
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);

  });

  it('should render correct name, cost, days', () => {
    const expectedName = 'Lorem ipsum';
    const expectedDays = 10;
    const expectedCost = '7';
    const expectedTags=['title', 'hello', 'text'];
    const component = shallow(<TripSummary days={expectedDays} cost={expectedCost} name={expectedName} tags={expectedTags}/>);

    const extractCost = component.find('span').at(1).text().split(' ', 2);
    const extractedCost = extractCost[1];

    const extractDay = component.find('span').at(0).text().split(' ', 2);
    const extractedDay = Number(extractDay[0]);

    expect(component.find('.title').text()).toEqual(expectedName);
    expect(extractedCost).toEqual(expectedCost);
    expect(extractedDay).toEqual(expectedDays);
  
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render correct tags', () => {
    const tagOne = 'title';
    const tagTwo = 'hello';
    const tagThree = 'text';
    const expectedTags=[tagOne, tagTwo, tagThree];
    
    const component = shallow(<TripSummary tags={expectedTags}/>);

    expect(component.find('.tag').at(0).text()).toEqual(tagOne);
    expect(component.find('.tag').at(1).text()).toEqual(tagTwo);
    expect(component.find('.tag').at(2).text()).toEqual(tagThree);

    console.log(component.debug());
  });

  it('shouldnt render tags array if array is empty', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

});