import java.util.ArrayList;
import java.util.List;

public class PowerOfTwoMaxHeap {
    private List<Integer> heap;
    private int childrenExponent;

    public PowerOfTwoMaxHeap(int childrenExponent) {
        if (childrenExponent <= 0) {
            throw new IllegalArgumentException("Children exponent must be greater than 0");
        }
        this.heap = new ArrayList<>();
        this.childrenExponent = childrenExponent;
    }

    public void insert(int value) {
        heap.add(value);
        heapifyUp();
    }

    public int popMax() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        int max = heap.get(0);
        int last = heap.remove(heap.size() - 1);

        if (!isEmpty()) {
            heap.set(0, last);
            heapifyDown();
        }

        return max;
    }

    private void heapifyUp() {
        int currentIndex = heap.size() - 1;
        int parentIndex = (currentIndex - 1) >> childrenExponent;

        while (currentIndex > 0 && heap.get(currentIndex) > heap.get(parentIndex)) {
            swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = (currentIndex - 1) >> childrenExponent;
        }
    }

    private void heapifyDown() {
        int currentIndex = 0;
        int maxChildIndex = getMaxChildIndex(currentIndex);

        while (maxChildIndex != -1 && heap.get(currentIndex) < heap.get(maxChildIndex)) {
            swap(currentIndex, maxChildIndex);
            currentIndex = maxChildIndex;
            maxChildIndex = getMaxChildIndex(currentIndex);
        }
    }

    private int getMaxChildIndex(int parentIndex) {
        int startIndex = (parentIndex << childrenExponent) + 1;
        int endIndex = Math.min(heap.size(), startIndex + (1 << childrenExponent));
        if (startIndex >= heap.size()) {
            return -1;
        }
        int maxChildIndex = startIndex;

        for (int i = startIndex + 1; i < endIndex; i++) {
            if (heap.get(i) > heap.get(maxChildIndex)) {
                maxChildIndex = i;
            }
        }

        return maxChildIndex;
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public static void main(String[] args) {
        // Example usage
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(2);
        heap.insert(10);
        heap.insert(5);
        heap.insert(20);

        System.out.println(heap.popMax()); // Output: 20
        System.out.println(heap.popMax()); // Output: 10
    }
}



