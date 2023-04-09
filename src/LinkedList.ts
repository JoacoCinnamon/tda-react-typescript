interface Linked<T> {
  append(value: T): this;
  append(node: Node<T>): this;
  append(arg: T | Node<T>): this;

  prepend(value: T): this;
  prepend(node: Node<T>): this;
  prepend(arg: T | Node<T>): this;

  deleteOne(value: T, first?: true): boolean;
  delete(value: T, howManyToDelete: number): number;

  getValues(): T[];
  getLength(): number;
}

export class LinkedList<T> implements Linked<T> {
  private length: number;
  public constructor(private head: Node<T> | null = null) {
    this.head = head;
    this.length = this.getLength() ?? 0;
  }

  public hasHead() {
    return this.head !== null;
  }

  private increaseLength(length: number) {
    this.length += length;
  }

  private decreaseLength(length: number) {
    this.length -= length;
  }

  public getLength() {
    let length = 0;
    this.forEach((_node) => {
      length++;
    });
    return length;
  }

  public append(value: T): this;
  public append(node: Node<T>): this;
  public append(arg: T | Node<T>): this {
    const newNode = arg instanceof Node ? arg : new Node(arg);
    if (!this.head) {
      this.head = newNode;
      this.increaseLength(this.getLength());
      return this;
    }

    let currentNode = this.head;
    while (currentNode.getNext() !== null) {
      currentNode = currentNode.getNext() as Node<T>;
    }
    currentNode.setNext(newNode);
    this.increaseLength(this.getLength());
    return this;
  }

  public prepend(value: T): this;
  public prepend(node: Node<T>): this;
  public prepend(arg: T | Node<T>): this {
    const newHead = arg instanceof Node ? arg : new Node(arg);
    if (!this.head) {
      this.head = newHead;
      this.increaseLength(this.getLength());
      return this;
    }

    let currentNode = newHead;
    while (currentNode.getNext() !== null) {
      currentNode = currentNode.getNext() as Node<T>;
    }
    currentNode.setNext(this.head);
    this.head = newHead;
    this.increaseLength(this.getLength());
    return this;
  }

  public deleteOne(searchedValue: T) {
    if (!this.head) return false;

    if (this.head.has(searchedValue)) {
      this.head = this.head.getNext();
      this.decreaseLength(1);
      return true;
    }

    let currentNode = this.head;
    while (currentNode.getNext() !== null) {
      const nextNode = currentNode.getNext() as Node<T>;
      if (nextNode.has(searchedValue)) {
        currentNode.setNext(nextNode.getNext() as Node<T>);
        this.decreaseLength(1);
        return true;
      }
      currentNode = nextNode;
    }

    return false;
  }

  public delete(searchedValue: T, howManyToDelete = Infinity) {
    if (!this.head) return 0;
    if (howManyToDelete <= 0) return 0;

    // Si son los primeros
    let deletedNodes = 0;
    while (this.head?.has(searchedValue)) {
      this.head = this.head.getNext();
      deletedNodes++;
      this.decreaseLength(1);
      if (this.head === null) return deletedNodes;
    }

    let currentNode = this.head;
    let nextNode = currentNode.getNext() as Node<T>;
    while (nextNode !== null) {
      if (nextNode.has(searchedValue)) {
        currentNode.setNext(nextNode.getNext() as Node<T>);
        nextNode = currentNode?.getNext() as Node<T>;
        deletedNodes++;
        this.decreaseLength(1);
      } else {
        currentNode = nextNode;
        nextNode = nextNode?.getNext() as Node<T>;
      }
      if (deletedNodes === howManyToDelete) return deletedNodes;
    }

    return deletedNodes;
  }

  public forEach(callbackfn: (currentNode: Node<T>) => void) {
    let currentNode = this.head;
    while (currentNode) {
      callbackfn(currentNode);
      currentNode = currentNode.getNext() as Node<T>;
    }
    return this;
  }

  public getValues() {
    const values = new Array<T>();
    this.forEach((node) => {
      values.push(node.getValue());
    });
    return values;
  }

  // Se pisan los siguientes nodos
  public mutReverse() {
    const valuesOfNodes = this.getValues().reverse();
    const [lastValue, ...restOfValues] = valuesOfNodes;
    if (lastValue === undefined || lastValue === null) return this;
    let newHead = new Node<T>(lastValue);
    let currentNode = newHead;
    for (const value of restOfValues) {
      newHead.setNext(new Node<T>(value));
    }
    this.head = newHead;
    this.length = this.getLength();
    return this;
  }

  // Se pisan los siguientes nodos
  public static reverse<T>(linkedList: LinkedList<T>) {
    const valuesOfNodes = linkedList.getValues().reverse();
    const [lastValue, ...restOfValues] = valuesOfNodes;
    if (lastValue === undefined || lastValue === null)
      return new LinkedList<T>();
    let newHead = new Node<T>(lastValue);
    let currentNode = newHead;
    for (const value of restOfValues) {
      newHead.setNext(new Node<T>(value));
    }
    return new LinkedList<T>(newHead);
  }

  public toString() {
    let result = "";
    this.forEach((node) => {
      result += `${node.getValue()} ${node.getNext() ? "=> " : ""}`;
    });
    return result.trim();
  }
}

export class Node<T> {
  public constructor(private value: T, private next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  has(value: T) {
    return this.value === value;
  }

  getValue() {
    return this.value;
  }

  getNext() {
    return this.next;
  }

  setNext(node: Node<T>) {
    this.next = node;
  }
}
