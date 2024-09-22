#Contains a dublicate
class Solution(object):
    def containsDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        seen = set()
        
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        
        return False
    
#Code worked 

#Valid Anagram

class Solution(object):
    def isAnagram(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        
        if len(s) != len(t):
            return False
        
        
        count = {}

        for char in s:
            count[char] = count.get(char, 0) + 1

        for char in t:
            if char not in count or count[char] == 0:
                return False
            count[char] -= 1

        return True

#Code Worked

#Two sum

class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        seen = {}
        
        for i, num in enumerate(nums):
            complement = target - num
            
            if complement in seen:
                return [seen[complement], i]
            
        
            seen[num] = i

#Code worked

#Remove Duplicate
class Solution(object):
    def removeDuplicates(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if not nums:
            return 0
        
        
        slow = 0
        
        for fast in range(1, len(nums)):
            if nums[fast] != nums[slow]:
                
                slow += 1
                nums[slow] = nums[fast]
        
        return slow + 1

#Worked