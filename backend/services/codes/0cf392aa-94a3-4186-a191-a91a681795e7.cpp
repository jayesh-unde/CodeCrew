
#include<bits/stdc++.h>
using namespace std;
int main() {
	int n;
	cin>>n;
	int arr[n];
	for(int i=0;i<n;i++){
		cin>>arr[i];
	}
	int left = 0;
	int right = n-1;
	int x = -1;
	int y = -1;
	while(left<=right){
		int sum = arr[left] + arr[right];
		if(sum>0){
			right--;
		}else if(sum<0){
			left++;
		}else{
			x = left;
			y = right;
			break;
		}
	}
	cout<<left<<" "<<right;
	return 0;
}
