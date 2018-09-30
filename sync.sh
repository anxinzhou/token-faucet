trap " kill -9 0 " SIGINT
echo 'syncing' 
rsync -vr dist ubuntu@ec2-54-85-123-223.compute-1.amazonaws.com:/home/ubuntu/faucet &&
rsync -vr dist ubuntu@ec2-18-235-195-108.compute-1.amazonaws.com:/home/ubuntu/faucet &&
rsync -vr dist ubuntu@ec2-34-224-178-228.compute-1.amazonaws.com:/home/ubuntu/faucet 
echo 'finish'
