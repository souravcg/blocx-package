import { Message } from './message.model';

describe('Message', () => {
  it('should create an instance', () => {
    let name="Component"
    let data=""
    expect(new Message(name,data)).toBeTruthy();
  });
});
