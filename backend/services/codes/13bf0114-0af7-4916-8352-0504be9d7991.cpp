
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int s = 2;
        int e = nums.size() - 1;
        int m;
        while (e >= s) {
            m = s + (e - s) / 2;
            if (nums[m] == target) return m;
            else if (nums[m] > target) {
                e = m - 1;
            } else {
                s = m + 1;
            }
        }
        return s;
    }
};

int main() {
    int n, target;
   
    cin >> n >> target;
    
    vector<int> nums(n);
    
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
    }
    
    Solution sol;
    int index = sol.searchInsert(nums, target);
    cout << index << endl;
    
    return 0;
}

