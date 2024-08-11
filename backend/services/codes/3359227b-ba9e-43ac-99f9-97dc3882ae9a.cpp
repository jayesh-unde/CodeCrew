#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

pair<int, int> two_sum(vector<pair<int, int>>& nums, int target) {
    // Sort the array based on the values while keeping track of original indices
    sort(nums.begin(), nums.end());

    int left = 0, right = nums.size() - 1;

    while (left < right) {
        int sum = nums[left].first + nums[right].first;
        if (sum == target) {
            // Return 1-based indices
            return {nums[left].second + 1, nums[right].second + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return {-1, -1}; // If no valid pair is found
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, target;
        cin >> n >> target;
        vector<pair<int, int>> nums(n);

        for (i = 0; i < n; ++i) {
            int num;
            cin >> num;
            nums[i] = {num, i}; // Store the number with its original index
        }
        pair<int, int> result = two_sum(nums, target);
        cout << result.first << " " << result.second << endl;
    }
    return 0;
}

