#include <iostream>
#include <vector>
#include <algorithm>
#include <climits> 
class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        if (nums1.size() > nums2.size()) {
            return findMedianSortedArrays(nums2, nums1); // Ensures nums1 is the smaller array
        }

        int n = nums1.size();
        int m = nums2.size();
        int low = 0, high = n;

        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (n + m + 1) / 2 - partitionX;

            int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minX = (partitionX == n) ? INT_MAX : nums1[partitionX];

            int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minY = (partitionY == m) ? INT_MAX : nums2[partitionY];

            if (maxX <= minY && maxY <= minX) {
                if ((n + m) % 2 == 0) {
                    return (std::max(maxX, maxY) + std::min(minX, minY)) / 2.0;
                } else {
                    return std::max(maxX, maxY);
                }
            } else if (maxX > minY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }

        throw std::invalid_argument("Input arrays are not sorted.");
    }
};

int main() {
    int m, n;

    std::cin >> m >> n;

    std::vector<int> nums1(m);
    std::vector<int> nums2(n);

    for (int i = 0; i < m; i++) {
        std::cin >> nums1[i];
    }

    for (int i = 0; i < n; i++) {
        std::cin >> nums2[i];
    }

    Solution solution;
    double median = solution.findMedianSortedArrays(nums1, nums2);

    std::cout << median << std::endl;

    return 0;
}
