#include <iostream>
#include <vector>

class Solution {
public:
    int findPeakElement(const std::vector<int>& nums) {
        int i = 0;
        int j = nums.size() - 1;
        while (i < j) {
            int mid = i + (j - i) / 2;
            if (nums[mid] < nums[mid + 1]) {
                i = mid + 1;
            } else {
                j = mid;
            }
        }
        return i;
    }
};

int main() {
    int n;
    std::cout << "Enter the number of elements in the array: ";
    std::cin >> n;

    std::vector<int> nums(n);
    std::cout << "Enter the elements of the array:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cin >> nums[i];
    }

    Solution solution;
    int peakIndex = solution.findPeakElement(nums);

    std::cout << "The peak element is at index: " << peakIndex << std::endl;

    return 0;
}
