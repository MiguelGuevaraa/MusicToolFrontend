import { Suscription } from './Suscription';

export class Pagos {
  id: number = 0;
  mount: number = 0;
  pay_date: Date = new Date(Date.now());
  pay_method: string = '';
  subs: Suscription = new Suscription();
}
