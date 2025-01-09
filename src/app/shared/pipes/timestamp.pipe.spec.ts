import { TimestampPipe } from './timestamp.pipe';

describe('TimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampPipe();
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='123456'
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='yui'
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Wed Oct 24 2018 17:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Thu Nov 28 2019 17:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Fri Nov 29 2019 17:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Fri Aug 2 2019 17:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Tue Oct 29 2019 17:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Tue Nov 12 2019 17:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Fri Dec 05 2019 16:00:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Fri Dec 06 2019 18:28:03 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    let value='Fri Dec 06 2019 18:24:60 GMT+0530 (India Standard Time)';
    const pipe = new TimestampPipe();
    pipe.transform(value)
    expect(pipe).toBeTruthy();
  });
});
