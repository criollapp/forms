import { CAModelAbstract, CAJson } from "@criollapp/common";

export class TestModel extends CAModelAbstract {
  public example1 = 'MyValue1';
  @CAJson('example1') exampleProperty1: string;
  @CAJson('example2') exampleProperty2: string;
  @CAJson() exampleProperty3: string;
}
