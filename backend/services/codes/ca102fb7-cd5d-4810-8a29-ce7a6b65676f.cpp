#include <iostream>
#include <vector>
#include <algorithm>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        // Get the sizes of both input arrays.
        int n = nums1.size();
        int m = nums2.size();

        // Merge the arrays into a single sorted array.
        std::vector<int> merged;
        merged.reserve(n + m);
        for (int i = 0; i < n; i++) {
            merged.push_back(nums1[i]);
        }
        for (int i = 0; i < m; i++) {
            merged.push_back(nums2[i]);
        }

        // Sort the merged array.
        std::sort(merged.begin(), merged.end());

        // Calculate the total number of elements in the merged array.
        int total = merged.size();

        if (total % 2 == 1) {
            // If the total number of elements is odd, return the middle element as the median.
            return static_cast<double>(merged[total / 2]);
        } else {
            // If the total number of elements is even, calculate the average of the two middle elements as the median.
            int middle1 = merged[total / 2 - 1];
            int middle2 = merged[total / 2];
            return (static_cast<double>(middle1) + static_cast<double>(middle2)) / 2.0;
        }
    }
};

int main() {
    int m, n;

    // Input the sizes of both arrays
    std::cout << "Enter the size of the first array: ";
    std::cin >> m;
    std::cout << "Enter the size of the second array: ";
    std::cin >> n;

    std::vector<int> nums1(m);
    std::vector<int> nums2(n);

    // Input the elements of the first array
    std::cout << "Enter the elements of the first array (sorted):" << std::endl;
    for (int i = 0; i < m; i++) {
        std::cin >> nums1[i];
    }

    // Input the elements of the second array
    std::cout << "Enter the elements of the second array (sorted):" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cin >> nums2[i];
    }

    Solution solution;
    double median = solution.findMedianSortedArrays(nums1, nums2);

    std::cout << "The median of the two sorted arrays is: " << median << std::endl;

    return 0;
}
