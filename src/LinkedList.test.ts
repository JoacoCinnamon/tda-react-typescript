// Generated by CodiumAI

import { LinkedList, Node } from "./LinkedList";

/*
Code Analysis

Main functionalities:
The LinkedList class is a data structure that represents a linked linkedList, which is a collection of nodes that contain a value and a reference to the next node in the linkedList. The main functionalities of this class are to add nodes to the linkedList, remove nodes from the linkedList, and iterate over the nodes in the linkedList.

Methods:
- getHead(): returns the head node of the linkedList
- hasHead(): returns a boolean indicating whether the linkedList has a head node
- append(arg: T | Node<T>): adds a new node to the end of the linkedList, either by passing in a value or a node object
- prepend(arg: T | Node<T>): adds a new node to the beginning of the linkedList, either by passing in a value or a node object
- delete(value: T): removes the first node in the linkedList that contains the specified value
- forEach(callbackfn: (currentNode: Node<T>) => void): iterates over each node in the linkedList and executes a callback function
- getValues(): returns an array of the values of each node in the linkedList
- toString(): returns a string representation of the linkedList, showing the value of each node and its reference to the next node (if any)

Fields:
- head: the first node in the linkedList, or null if the linkedList is empty
*/

describe("LinkedList", () => {
  describe("append", () => {
    // Tests that the append() method correctly adds a new node to the end of the linkedList.
    it("test_append_node", () => {
      const linkedList = new LinkedList<number>().append(1).append(2).append(3);
      expect(linkedList.getValues()).toEqual([1, 2, 3]);
    });

    it("should append various nodes to the end", () => {
      const moreNodes = new Node(4, new Node(5, new Node(6)));
      const linkedList = new LinkedList<number>()
        .append(1)
        .append(2)
        .append(3)
        .append(moreNodes);
      expect(linkedList.getValues()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("prepend", () => {
    // Tests that the prepend() method correctly adds a new node to an empty linkedList.
    it("test_prepend_empty_list", () => {
      const linkedList = new LinkedList<number>().prepend(1);
      expect(linkedList.getValues()).toEqual([1]);
    });

    it("should prepend all the nodes", () => {
      const linkedList = new LinkedList<number>()
        .prepend(3)
        .prepend(5)
        .prepend(7);
      expect(linkedList.getValues()).toEqual([7, 5, 3]);
    });

    it("should prepend the node with many nodes", () => {
      const manyNodes = new Node(6, new Node(4, new Node(2)));
      const linkedList = new LinkedList<number>()
        .prepend(3)
        .prepend(5)
        .prepend(7)
        .append(9)
        .prepend(manyNodes);
      expect(linkedList.getValues()).toEqual([6, 4, 2, 7, 5, 3, 9]);
    });
  });

  describe("deleteOne", () => {
    // Tests that the delete() method returns false when trying to delete a node that is not in the linkedList.
    it("test_delete_non_existing_node", () => {
      const linkedList = new LinkedList<number>().append(1).append(2);
      expect(linkedList.deleteOne(3)).toBe(false);
    });

    it("should just delete one node", () => {
      const linkedList = new LinkedList<number>().append(3).append(3).append(3);
      expect(linkedList.deleteOne(3)).toBe(true);
      expect(linkedList.getValues()).toEqual([3, 3]);
      expect(linkedList.getValues()).toHaveLength(2);
    });

    it("should not delete any node", () => {
      const linkedList = new LinkedList<number>().append(5).append(5).append(5);
      expect(linkedList.deleteOne(3)).toBe(false);
      expect(linkedList.getValues()).toEqual([5, 5, 5]);
      expect(linkedList.getValues()).toHaveLength(3);
    });
  });

  describe("deleteMany", () => {
    it("should just delete the first node with that value", () => {
      const linkedList = new LinkedList<number>()
        .append(1)
        .append(2)
        .append(3)
        .append(3);
      expect(linkedList.delete(3, 1)).toBe(1);
      expect(linkedList.getValues()).toEqual([1, 2, 3]);
      expect(linkedList.getValues()).toHaveLength(3);
    });

    it("should delete all the nodes", () => {
      const linkedList = new LinkedList<number>()
        .append(1)
        .prepend(1)
        .append(1)
        .prepend(1)
        .append(1);
      expect(linkedList.delete(1)).toBe(5);
      expect(linkedList.getValues()).toHaveLength(0);
    });

    it("should just delete four of the five nodes with that value", () => {
      const linkedList = new LinkedList<number>() // -5 => -4 => -5 => -5 => -5 => -4 => -5 => NULL
        .append(-5)
        .append(-5)
        .append(-5)
        .append(-4)
        .prepend(-4)
        .prepend(-5)
        .append(-5);
      expect(linkedList.delete(-5, 4)).toBe(4);
      expect(linkedList.getValues()).toEqual([-4, -4, -5]);
      expect(linkedList.getValues()).toHaveLength(3);
    });

    it("should delete all the nodes with that value", () => {
      const linkedList = new LinkedList<number>()
        .append(5)
        .append(5)
        .append(5)
        .append(5)
        .prepend(10)
        .append(10);
      expect(linkedList.delete(5)).toBe(4);
      expect(linkedList.getValues()).toEqual([10, 10]);
      expect(linkedList.getValues()).toHaveLength(2);
    });

    it("should delete all the nodes betwen the non deleteable", () => {
      const linkedList = new LinkedList<number>()
        .append(5)
        .append(5)
        .prepend(10)
        .prepend(5)
        .prepend(5);
      expect(linkedList.delete(5)).toBe(4);
      expect(linkedList.getValues()).toEqual([10]);
      expect(linkedList.getValues()).toHaveLength(1);
    });

    it("should not delete many nodes", () => {
      const linkedList = new LinkedList<number>().append(66).append(77);
      expect(linkedList.delete(19)).toBe(0);
      expect(linkedList.getValues()).toEqual([66, 77]);
      expect(linkedList.getValues()).toHaveLength(2);
    });
  });

  describe("getLength", () => {
    it("should return the correct length of the linked linkedList", () => {
      const linkedList = new LinkedList<number>().append(1).append(2).append(3);
      expect(linkedList.getLength()).toEqual(3);
    });

    it("should not return a correct length", () => {
      const manyNodes = new Node(7, new Node(9, null));
      const linkedList = new LinkedList<number>()
        .append(5)
        .prepend(1)
        .prepend(3)
        .append(manyNodes);
      expect(linkedList.delete(4)).toEqual(0);
      expect(linkedList.deleteOne(7)).toBe(true);
      expect(linkedList.getLength()).not.toEqual(3);
    });

    it("should just return a linked linkedList of 0 nodes", () => {
      const linkedList = new LinkedList<number>();
      expect(linkedList.getLength()).toEqual(0);
    });
  });

  describe("reverse and mutable reverse", () => {
    it("should return the linked linkedList reversed", () => {
      const linkedList = new LinkedList<number>().append(1).append(2).append(3);
      const reversedLinkedList = LinkedList.reverse(linkedList);
      linkedList.mutReverse();
      expect(reversedLinkedList.getValues()).toEqual([3, 2, 1]);
      expect(linkedList.getValues()).toEqual([3, 2, 1]);
    });

    it("should not return the linked linkedList reversed", () => {
      const linkedList = new LinkedList<number>();
      const reversedLinkedList = LinkedList.reverse(linkedList);
      linkedList.mutReverse();
      expect(reversedLinkedList.getValues().length).toEqual(0);
      expect(linkedList.getValues()).toHaveLength(0);
    });

    it("should not mutate the original linkedList", () => {
      const linkedList = new LinkedList<number>()
        .prepend(5)
        .prepend(10)
        .append(15);
      const reversedLinkedList = LinkedList.reverse(linkedList);
      expect(reversedLinkedList).not.toEqual(linkedList);
      expect(reversedLinkedList.getValues()).not.toEqual(
        linkedList.getValues()
      );
      expect(reversedLinkedList.getLength()).toEqual(linkedList.getLength());
    });
  });

  describe("forEach", () => {
    // Tests that the foreach() method correctly calls the provided callback function for each node in the linkedList.
    it("test_for_each_callback", () => {
      const linkedList = new LinkedList<number>().append(1).append(2).append(3);
      const callback = jest.fn();
      linkedList.forEach(callback);
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith(expect.any(Node<Number>));
    });
  });

  describe("getValues", () => {
    // Tests that the getvalues() method correctly returns an array of all node values in the linkedList.
    it("test_get_values", () => {
      const linkedList = new LinkedList<string>()
        .append("hello")
        .append("world")
        .append("!");
      const values = linkedList.getValues();
      expect(values).toEqual(["hello", "world", "!"]);
    });
  });

  describe("toString", () => {
    // Tests that the tostring() method correctly converts the linkedList to a string representation.
    it("test_to_string", () => {
      const linkedList = new LinkedList<number>().append(1).append(2).append(3);
      expect(linkedList.toString()).toBe("1 => 2 => 3");
    });
  });
});
