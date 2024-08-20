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
    
    std::cin >> n;

    std::vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        std::cin >> nums[i];
    }

    Solution solution;
    int peakIndex = solution.findPeakElement(nums);

    std::cout << peakIndex << std::endl;

    return 0;
}
